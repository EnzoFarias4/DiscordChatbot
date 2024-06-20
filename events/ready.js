const events = require('events');
const fs = require('fs');
require('dotenv').config();
class MyEmitter extends events.EventEmitter {}
const myEmitter = new MyEmitter();
const MESSAGE = process.env.MESSAGE || 'Hello, World!';
const FILENAME = process.env.FILENAME || 'message.txt';
myEmitter.on('log', message => {
    console.log(`Log: ${message}`);
});
myEmitter.on('save', (message, filename) => {
    fs.writeFile(filename, message, err => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        myEmitter.emit('log', `Message saved to ${filename}`);
    });
});
myEmitter.emit('log', MESSAGE);
myEmitter.emit('save', MESSAGE, FILENAME);