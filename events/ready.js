const events = require('events');
const fileSystem = require('fs'); // More descriptive variable name for the 'fs' module
require('dotenv').config();

class CustomEventEmitter extends events.EventEmitter {} // Renamed for clarity
const customEmitter = new CustomEventEmitter(); // Corrected the name to match the class

const DEFAULT_MESSAGE = process.env.MESSAGE || 'Hello, World!'; // More descriptive constant name
const DEFAULT_FILENAME = process.env.FILENAME || 'message.txt'; // More descriptive constant name

// Improved error handling within event listeners
customEmitter.on('logMessage', message => {
    if (typeof message !== 'string' || message.length === 0) {
        console.error('Invalid message received for logging.');
        return;
    }
    console.log(`Log: ${message}`);
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
            // Emitting more descriptive and specific error messages
            customEmitter.emit('logMessage', `Error writing to file ${targetFilename}: ${error.message}`);
            return;
        }
        customEmitter.emit('logMessage', `Message saved to ${targetFilename}`);
    });
});

// Emitting events with the more descriptive event names
customEmitter.emit('logMessage', DEFAULT_MESSAGE);
customEmitter.emit('saveToFile', DEFAULT_MESSAGE, DEFAULT_FILENAME);