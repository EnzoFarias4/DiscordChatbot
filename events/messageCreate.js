const EventEmitter = require('events');
const axios = require('axios'); // Assuming axios for API calls
require('dotenv').config();

class MyEventEmitter extends EventEmitter {}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.on('batchProcess', async (apiRequests) => {
  console.log('Processing batched API requests...');
  try {
    const responses = await Promise.all(apiRequests.map(req => axios(req)));
    console.log('Batch request successful!', responses);
  } catch (error) {
    console.error('Batch request failed:', error);
  }
});

myEventEmitter.emit('event');

console.log(`Your Environment Variable Directive: ${process.env.MY_VARIABLE}`);

let apiCallQueue = [];
function queueApiCall(apiRequest) {
  apiCallQueue.push(apiRequest);
}

setInterval(() => {
  if (apiCallQueue.length > 0) {
    myEventEmitter.emit('batchProcess', apiCallQueue);
    apiCallQueue = [];
  }
}, 10000);