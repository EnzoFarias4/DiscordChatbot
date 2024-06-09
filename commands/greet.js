const fs = require('fs');
const dotenv = require('dotenv');
const { exec } = require('child_process');

// Load environment variables
dotenv.config();

const executeLangCommand = (language) => {
    let command = '';

    // Ensure that the environment variables for script paths are defined
    if(!process.env.PYTHON_SCRIPT || !process.env.JS_SCRIPT || !process.env.RUBY_SCRIPT) {
        console.error('Error: Script paths must be defined in the environment variables.');
        return;
    }

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

// Example usage
// Make sure to replace these with actual scripts and corresponding languages for testing
executeLangConfig('python');
// Add more calls as needed