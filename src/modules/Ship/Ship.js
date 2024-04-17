class Ship {
  constructor(name, length, direction, coordinates) {
    this.name = name;
    this.length = length;
    this.direction = direction;
    this.coordinates = coordinates;
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
