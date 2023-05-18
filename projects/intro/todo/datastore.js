const fs = require('fs/promises');

const filename = 'data.json';
const filepath = `./${filename}`;

async function load() {
  try {
    const content = await fs.readFile(filepath, {
      encoding: 'utf-8',
    });
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

async function save(data) {
  try {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  load,
  save,
};
