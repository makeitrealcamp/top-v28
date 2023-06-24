function Arrey() {
  Object.defineProperty(this, 'length', {
    writable: true,
    value: 0,
  });
  if (arguments.length > 0) {
    for (let index = 0; index < arguments.length; index++) {
      const value = arguments[index];
      this.push(value);
    }
  }
}

Arrey.prototype.toString = function () {
  let result = '';
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    result += `${element}`;
    if (index < this.length - 1) {
      result += ', ';
    }
  }
  return `[${result}]`;
};

Arrey.prototype.push = function () {
  if (arguments.length > 0) {
    for (let index = 0; index < arguments.length; index++) {
      const value = arguments[index];
      Object.defineProperty(this, this.length, {
        writable: true,
        enumerable: true,
        configurable: true,
        value,
      });
      this.length++;
    }
  }
  return this.length;
};

Arrey.prototype.pop = function () {
  if (this.length > 0) {
    const result = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return result;
  }
};

Arrey.prototype.indexOf = function (value, fromIndex = 0) {
  let position = -1;
  for (let index = fromIndex; index < this.length; index++) {
    const element = this[index];
    if (Object.is(element, value)) {
      position = index;
      break;
    }
  }
  return position;
};

Arrey.prototype.includes = function (value) {
  return this.indexOf(value) !== -1;
};

Arrey.prototype.forEach = function (iterator) {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    iterator(element, index, this);
  }
};

Arrey.prototype.filter = function (iterator) {
  const result = new Arrey();
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (iterator(element, index, this)) {
      result.push(element);
    }
  }
  return result;
};

Arrey.prototype.map = function (iterator) {
  const result = new Arrey();
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    result.push(iterator(element, index, this));
  }
  return result;
};

Arrey.prototype.reduce = function (iterator, ac) {
  let result = ac;
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    result = iterator(result, element, index, this);
  }
  return result;
};

Arrey.prototype[Symbol.iterator] = function* () {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    yield element;
  }
};

module.exports = Arrey;
