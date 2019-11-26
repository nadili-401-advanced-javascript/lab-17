'use strict';

const FCH = require('./file-changer.js');

let file = process.argv.slice(2).shift();

FCH.alterFile(file);
// console.log(`${file} content updated!`);
