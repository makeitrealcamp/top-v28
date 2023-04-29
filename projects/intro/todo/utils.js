function printList(items) {
  for (let index = 0; index < items.length; index++) {
    const element = items[index];

    const name = element.name;
    const checked = element.completed ? '[✓]' : '[ ]';
    const date = new Date(element.date);

    console.log(`${index + 1}: ${checked} ${name} ${date}`);
  }
}

module.exports = {
  printList,
};
