const fs = require('fs');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

const executeLangCommand = (language) => {
    let command = '';

    switch (language.toLowerCase()) {
        case 'python':
            command = `python ${process.env.PYTHON_SCRIPT}`;
            break;
        case 'javascript':
            command = `node ${process.env.JS_SCRIPT}`;
            break;
        case 'ruby':
            command = `ruby ${process.env.RUBY_SCRIPT}`;
            break;
        default:
            console.error('Unsupported language.');
            return;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
        console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};