const fs = require('fs');
require('dotenv').config();
const executeCommand = (language) => {
    switch (language) {
        case 'python':
            console.log(`Executing Python script using: ${process.env.PYTHON_COMMAND}`);
            break;
        case 'nodejs':
            console.log(`Executing NodeJS script using: ${process.env.NODEJS_COMMAND}`);
            break;
        default:
            console.log('Language not supported');
    }
};
module.exports = {
    executeCommand
};