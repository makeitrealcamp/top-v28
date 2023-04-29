const fs = require('fs');

function load(filepath) {
  try {
    const content = fs.readFileSync(filepath, {
      encoding: 'utf-8',
    });
    return JSON.parse(content);
  } catch (error) {
    throw new Error(error);
  }
}

function save(filepath, data) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  load,
  save,
};
