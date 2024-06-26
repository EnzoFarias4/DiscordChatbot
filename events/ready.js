const events = require('events');
const fileSystem = require('fs');
require('dotenv').config();

class CustomEventEmitter extends events.EventEmitter {}
const customEmitter = new CustomEventEmitter();

const DEFAULT_MESSAGE = process.env.MESSAGE || 'Hello, World!';
const DEFAULT_FILENAME = process.env.FILENAME || 'message.txt';

function logToConsole(message) {
    if (typeof message === 'string' && message.length > 0) {
        console.log(message);
    } else {
        console.error('Attempted to log an invalid message to the console.');
    }
}

customEmitter.on('logMessage', message => {
    if (typeof message !== 'string' || message.length === 0) {
        logToConsole('Invalid message received for logging.');
        return;
    }
    logToConsole(`Log: ${message}`);
});

customEmitter.on('saveToFile', (messageContent, targetFilename) => {
    if (typeof messageContent !== 'string' || messageContent.length === 0) {
        customEmitter.emit('logMessage', 'Error: Message content is invalid and cannot be saved.');
        return;
    }
    if (typeof targetFilename !== 'string' || targetFilename.length === 0) {
        customEmitter.emit('logMessage', 'Error: Target filename is invalid and cannot be used for saving.');
        return;
    }

    fileSystem.writeFile(targetFilename, messageContent, error => {
        if (error) {
            logToConsole(`Error writing to file ${targetFilename}: ${error.message}`);
            return;
        }
        logToConsole(`Message saved to ${targetFilename}`);
    });
});

logToConsole(DEFAULT_MESSAGE);
customEmitter.emit('saveToFile', DEFAULT_MESSAGE, DEFAULT_FILENAME);