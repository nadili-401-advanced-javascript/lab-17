'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('save', (payload) => {
  console.log(`File ${payload} changed successfully`);
});

socket.on('err', (payload) => {
  console.log(`File change error ${payload}`);
});