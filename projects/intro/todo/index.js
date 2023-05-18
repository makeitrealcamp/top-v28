const commandLineArgs = require('command-line-args');

const { load, save } = require('./datastore');
const { printList } = require('./utils');

const optionDefinitions = [
  { name: 'name', alias: 'n', type: String },
  { name: 'completed', alias: 'c', type: Boolean, defaultOption: false },
  { name: 'date', alias: 'd', type: String },
];

const options = commandLineArgs(optionDefinitions);

const { name = '', completed = false, date = '' } = options;

async function main() {
  const items = await load();

  if (name) {
    items.push({
      name,
      completed,
      date,
    });
  }

  try {
    await save(items);
    printList(items);
  } catch (error) {
    console.error(error);
  }
}

main();
