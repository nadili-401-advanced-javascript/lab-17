'use strict';

const fs = require('fs');
const util = require('util');
const faker = require('faker');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const rf = typeof fs.readFile === 'function' ?
  util.promisify(fs.readFile) :
  async function () {
    throw new Error('Invalid operation.');
  };

const wf = typeof fs.writeFile === 'function' ?
  util.promisify(fs.writeFile) :
  async function () {
    throw new Error('Invalid operation.');
  };

// read file
const readFile = async (file) => {
  return await rf(file);
};


//write file
const writeFile = async (file) => {
  let newLoremString = faker.lorem.sentence();
  return await wf(file, newLoremString);
};

//alter file 
const alterFile = async (file) => {

  try {let data = await readFile(file);

  //Log data before alter file content
  socket.emit('save', `${file}`);
  await writeFile(file);
  
  let newData = await readFile(file);

  //Log data after alter file content
  socket.emit('save', `${file}`);
} catch (e){
    socket.emit('error', e.message);
}
};

module.exports = { readFile, writeFile, alterFile };
