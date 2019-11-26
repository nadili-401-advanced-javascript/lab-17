'use strict';

const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3001,
  host: 'localhost',
};

// Listen for a 'connect' event, and call the anon function specified
socket.on('connect', () => {
  console.log('Logger.js >> connected!');
});

// Connect to TCP server
socket.connect(config, () => {
  console.log('connected to server!');
});

socket.on('close', () => {
  console.log('I am closing!');
});
  

// Listen for the 'data' event, and call the anon function specified
socket.on('data', data => {
  console.log('Logger.js >> I just received data from an outside source!');
  console.log('Logger.js >> That data is:', data.toString());
});
