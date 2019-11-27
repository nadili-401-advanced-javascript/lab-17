'use strict';

// Requiring in socket.io and setting port to 3000
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Connected on: ', socket.id);

  socket.on('save', (payload) => {
    socket.broadcast.emit('save', payload);
  });

  socket.on('error', (payload) => {
    socket.broadcast.emit('error', payload);
  });
});



