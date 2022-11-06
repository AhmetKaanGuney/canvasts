let _id = 0;

class Id {
  current() {
    return parseInt(_id.toString());
  }

  generate() {
    return _id++;
  }
  reset() {
    _id = 0;
  }
}

export default new Id();
