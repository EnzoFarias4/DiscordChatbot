const EventEmitter = require('events');
const axios = require('axios'); 
require('dotenv').config();

class MyEventEmitter extends EventEmitter {}

const myEventEmitter = new MyEventEmitter();

const privateData = new WeakMap();

privateData.set(myEventEmitter, {
  apiCallQueue: []
});

myEventEmitter.on('batchProcess', async (apiRequests) => {
  console.log('Processing batched API requests...');
  try {
    const responses = await Promise.all([...apiRequests].map(req => axios(req)));
    console.log('Batch request successful!', responses);
  } catch (error) {
    console.error('Batch request failed:', error);
  }
});

console.log(`Your Environment Variable Directive: ${process.env.MY_VARIABLE}`);

function queueApiCall(apiRequest) {
  const data = privateData.get(myEventEmitter);
  if (data) {
    data.apiCallQueue.push(apiRequest);
  }
}

setInterval(() => {
  const data = privateData.get(myEventEmitter);
  if (data && data.apiCallQueue.length > 0) {
    const processQueue = [...data.apiCallQueue];
    data.apiCallQueue.length = 0; 
    myEventEmitter.emit('batchProcess', processQueue);
  }
}, 10000);