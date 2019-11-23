'use strict';

jest.mock('fs');

const fileChanger = require('../file-changer/file-changer.js');

describe('File Changer', () => {

  it('thows error if given bad file', () => {
    try {
      fileChanger.readFile('bad.txt');
    } catch (error) {
      expect(error).toBe('Invalid file');
    }
  });

});