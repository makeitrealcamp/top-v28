const fs = require('fs');
const commandLineArgs = require('command-line-args');

const { load, save } = require('./datastore');
const { printList } = require('./utils');

const filename = 'data.json';

const optionDefinitions = [
  { name: 'name', alias: 'n', type: String },
  { name: 'completed', alias: 'c', type: Boolean, defaultOption: false },
  { name: 'date', alias: 'd', type: String },
];

const options = commandLineArgs(optionDefinitions);

const { name = '', completed = false, date = '' } = options;
const items = load(`./${filename}`);

if (name) {
  items.push({
    name,
    completed,
    date,
  });

  save(`./${filename}`, items);
}

printList(items);
