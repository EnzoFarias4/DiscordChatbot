const fs = require('fs');
require('dotenv').config();

const axios = require('axios');

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

const makeEfficientAPICall = async (requests) => {
    try {
        const responses = await Promise.all(requests.map(req => axios(req)));
        console.log("API calls executed efficiently", responses);
    } catch (error) {
        console.error("Error making API calls", error);
    }
};

module.exports = {
    executeCommand,
    makeEfficientAPICall
};