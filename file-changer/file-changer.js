'use strict';

const fs = require('fs');
const util = require('util');
const faker = require('faker');
const net = require('net');

const socket = new net.Socket();

let config = {
  port: 3001,
  host: 'localhost',
};

socket.connect(config, () => {});

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

  let data = await readFile(file);
  await writeFile(file);

  //Log data before alter file content
  setTimeout(async function() {
    socket.write(data);
  }, 2000);

  let newData = await readFile(file);

  //Log data after alter file content
  setTimeout(async function() {
    socket.write(newData);
  }, 2000);
  
  setTimeout(function() {
    socket.destroy();
  }, 4000);
};

module.exports = { readFile, writeFile, alterFile };
