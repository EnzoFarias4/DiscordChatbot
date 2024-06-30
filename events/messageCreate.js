const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.on('event', () => {
  console.log('An event occurred!');
});

myEventEmitter.emit('event');

require('dotenv').config();

console.log(`Your Environment Variable Value: ${process.env.MY_VARIABLE}`);