'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('save', (payload) => {
  console.log(`New file content: ${payload}`);
});

socket.on('err', (payload) => {
  console.log(`File change error ${payload}`);
});