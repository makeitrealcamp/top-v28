const Arrey = require('./index');

describe('Arrey', function () {
  test('Empty Arrey', function () {
    const arrey = new Arrey();

    expect(arrey.length).toEqual(0);
  });

  test('Add elements', function () {
    const arrey = new Arrey();

    arrey.push(1);
    expect(arrey[0]).toEqual(1);
    expect(arrey.length).toEqual(1);

    arrey.push(2);
    const length = arrey.push(3);
    expect(length).toEqual(3);
  });

  test('No add elements without value', function () {
    const arrey = new Arrey();

    arrey.push();
    expect(arrey.length).toEqual(0);
  });

  test('Change the value of the elements', function () {
    const arrey = new Arrey();

    arrey.push(1);
    arrey[0] = 2;

    expect(arrey[0]).toEqual(2);
  });

  test('Remove elements', function () {
    const arrey = new Arrey();

    arrey.push(1, 2, 3);

    const result = arrey.pop();
    expect(result).toEqual(3);
  });

  test('Init with multiples values', function () {
    const arrey = new Arrey(1, 2, 3);

    expect(arrey.length).toEqual(3);
    expect(arrey[1]).toEqual(2);
  });

  test('Find index of the element', function () {
    const arrey = new Arrey(2, 'arrey', 6, NaN, 3, 2);

    expect(arrey.indexOf(2)).toEqual(0);
    expect(arrey.indexOf('arrey')).toEqual(1);
    expect(arrey.indexOf(NaN)).toEqual(3);
    expect(arrey.indexOf(3)).toEqual(4);
    expect(arrey.indexOf(2, 1)).toEqual(5);
  });

  test('includes an element', function () {
    const arrey = new Arrey(1, 2, 3);

    expect(arrey.includes(4)).toBeFalsy();
    expect(arrey.includes(3)).toBeTruthy();
  });
});

describe('Arrey methods', function () {
  test('forEach method', function () {
    const arrey = new Arrey(1, 2);

    let result = '';
    arrey.forEach(function (element, index) {
      result += `[${index}]: ${element}, `;
    });

    expect(result).toEqual('[0]: 1, [1]: 2, ');
  });

  test('filter method', function () {
    const arrey = new Arrey(1, 2, 3, 4, 5);

    const result = arrey.filter(function (element) {
      return element % 2 === 0;
    });

    expect(result.toString()).toEqual('[2, 4]');
    expect(result[0]).toEqual(2);
    expect(result[1]).toEqual(4);
  });

  test('map method', function () {
    const arrey = new Arrey(1, 2, 3);

    const result = arrey.map(function (element) {
      return element * 2;
    });

    expect(result.toString()).toEqual('[2, 4, 6]');
    expect(result[0]).toEqual(2);
    expect(result[1]).toEqual(4);
    expect(result[2]).toEqual(6);
  });

  test('reduce method', function () {
    const arrey = new Arrey(1, 2, 3);

    const result = arrey.reduce(function (sum, element) {
      return sum + element;
    }, 0);

    expect(result).toEqual(6);
  });

  test('spread operator', function () {
    const arrey = new Arrey(1, 2, 3);
    const arrey2 = new Arrey(4, 5);

    arrey2.push(...arrey);

    expect(arrey2.length).toEqual(5);
    expect(arrey2[2]).toEqual(1);
    expect(arrey2[3]).toEqual(2);
    expect(arrey2[4]).toEqual(3);
  });
});
