const fs = require('fs');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

const executeScript = ({language, scriptPath}) => {
    let command = '';
    const scriptEnvVar = `${language.toUpperCase()}_SCRIPT`;

    if(!process.env[scriptEnvVar] && !scriptPath) {
        console.error(`Error: Script path must be defined in the environment variables or passed as an argument.`);
        return;
    }

    const scriptToExecute = scriptPath || process.env[scriptEnvVar];

    switch (language.toLowerCase()) {
        case 'python':
            command = `python ${scriptToExecute}`;
            break;
        case 'javascript':
            command = `node ${scriptToExecute}`;
            break;
        case 'ruby':
            command = `ruby ${scriptToExecute}`;
            break;
        default:
            console.error('Unsupported language or script path not provided.');
            return;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script Error: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
};

executeScript({language: 'python'});
executeScript({language: 'python', scriptPath: 'path/to/your/script.py'});