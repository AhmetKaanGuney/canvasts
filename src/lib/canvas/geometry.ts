type Position = {
  x: number;
  y: number;
};

function addPositions(a: Position, b: Position) {
  return {
    x: a.x + b.x,
    y: b.y + b.y,
  };
}

function subtractPositions(a: Position, b: Position) {
  return {
    x: a.x - b.x,
    y: b.y - b.y,
  };
}

function multiplyPositions(a: Position, b: Position) {
  return {
    x: a.x * b.x,
    y: b.y * b.y,
  };
}

function dividePositions(a: Position, b: Position) {
  return {
    x: a.x / b.x,
    y: b.y / b.y,
  };
}

export class Point {
  x = 0;
  y = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static add(a: Point, b: Point) {
    const result = addPositions(a, b);
    return new Vector(result.x, result.y);
  }

  static applyVector(a: Point, b: Vector) {
    const result = addPositions(a, b);
    return new Point(result.x, result.y);
  }

  static distance(a: Point, b: Point) {
    const result = subtractPositions(a, b);
    return new Vector(result.x, result.y);
  }

  static midPoint(a: Point, b: Point) {
    const result = dividePositions(a, b);
    return new Point(result.x, result.y);
  }
}

export class Vector {
  x = 0;
  y = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  flip(v: Vector) {
    v.x = -v.x;
    v.y = -v.y;
  }

  flipX(v: Vector) {
    v.x = -v.x;
  }

  flipY(v: Vector) {
    v.y = -v.y;
  }

  static add(a: Vector, b: Vector) {
    const result = addPositions(a, b);
    return new Vector(result.x, result.y);
  }

  static multiply(a: Vector, b: Vector) {
    const result = multiplyPositions(a, b);
    return new Vector(result.x, result.y);
  }
}
