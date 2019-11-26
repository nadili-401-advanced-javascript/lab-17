'use strict';

const fs = require('fs');
const util = require('util');
const faker = require('faker');

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

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');



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

  try {
    
    let data = await readFile(file);

    //Log data before alter file content
    socket.emit('save', data);
    await writeFile(file);
  
    let newData = await readFile(file);

    //Log data after alter file content
    socket.emit('save', newData);
  } catch (e){
    socket.emit('error', e.message);
  }
};

module.exports = { readFile, writeFile, alterFile };
