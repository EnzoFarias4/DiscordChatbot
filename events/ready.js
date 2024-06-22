const events = require('events');
const fileSystem = require('fs'); // More descriptive variable name for the 'fs' module
require('dotenv').config();

class CustomEventEmitter extends events.EventEmitter {} // Renamed for clarity
const customEmitter = new CustomMarketEmitter(); // Renamed to reflect the new class name

const DEFAULT_MESSAGE = process.env.MESSAGE || 'Hello, World!'; // More descriptive constant name
const DEFAULT_FILENAME = process.env.FILENAME || 'message.txt'; // More descriptive constant name

customEmitter.on('logMessage', message => {
    console.log(`Log: ${message}`);
});

customEmitter.on('saveToFile', (messageContent, targetFilename) => { // More descriptive event and parameter names
    fileSystem.writeFile(targetFilename, messageContent, error => { // More descriptive parameter names
        if (error) {
            console.error('Error writing file:', error);
            return;
        }
        customEmitter.emit('logArrayessage', `Message saved to ${targetFilename}`);
    });
});

// Emitting events with the more descriptive event names
customEmitter.emit('logMessage', DEFAULT_MESSAGE);
customEmitter.emit('saveToFile', DEFAULT_MESSAGE, DEFAULT_FILENAME);