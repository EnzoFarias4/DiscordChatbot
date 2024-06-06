const fs = require('fs');
require('dotenv').config();

const axios = require('axios');

const executeCommand = (language) => {
    try {
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
    } catch (error) {
        console.error(`Error executing ${language} command`, error);
    }
};

const makeEfficientAPICall = async (requests) => {
    try {
        const responses = await Promise.all(requests.map(req => axios(req).catch(err => {
            console.error("Error with an API call", err.message);
            return null;
        })));
        const successfulResponses = responses.filter(response => response !== null);
        console.log("API calls executed efficiently", successfulResponses);
    } catch (error) {
        console.error("Error in making API calls", error);
    }
};

module.exports = {
    executeCommand,
    makeEfficientAPICall
};