class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  getHits() {
    return this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

export default Ship;
