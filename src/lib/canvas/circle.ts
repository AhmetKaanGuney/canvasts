import { VERTICAL_FRICTION, HORIZONTAL_FRICTION, GRAVITY } from '../constants';
import { theme } from '../style';
import Id from '../id';
import { Point, Vector } from './geometry';

type CircleStyle = {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
};

export default class Circle {
  id: number;
  position: Point;
  velocity: Vector;
  radius = 0;

  canvas: HTMLCanvasElement;
  c: CanvasRenderingContext2D;

  style = {
    fillStyle: theme.gray[50],
    strokeStyle: theme.gray[80],
    lineWidth: 1,
  };
  gravityDisabled = false;

  constructor(
    position: Point,
    radius: number,
    velocity: Vector,
    canvas: HTMLCanvasElement,
    style?: CircleStyle
  ) {
    this.id = Id.generate();
    this.position = position;
    this.radius = radius;
    this.velocity = velocity;
    this.canvas = canvas;
    this.c = this.canvas.getContext('2d')!;

    if (style) {
      this.style = { ...this.style, ...style };
    }
  }

  draw(): void {
    this.c.save();

    this.c.beginPath();
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

    this.c.clip();
    this.c.fillStyle = this.style.fillStyle;
    this.c.fill();
    this.c.lineWidth = this.style.lineWidth * 2;
    this.c.strokeStyle = this.style.strokeStyle;
    this.c.stroke();

    this.c.restore();
  }

  update(): void {
    // Collision
    const collidesLeft = this.position.x - this.radius + this.velocity.x < 0;
    const collidesRight =
      this.position.x + this.radius + this.velocity.x > this.canvas.width;
    const collidesTop = this.position.y - this.radius + this.velocity.y < 0;
    const collidesBottom =
      this.position.y + this.radius + this.velocity.y > this.canvas.height;

    if (collidesLeft || collidesRight) {
      this.velocity.x = -this.velocity.x * HORIZONTAL_FRICTION;
    }

    if (collidesTop) {
      this.velocity.y = -this.velocity.y;
    }

    if (collidesBottom) {
      this.velocity.y = -this.velocity.y * VERTICAL_FRICTION;
      this.velocity.x = this.velocity.x * HORIZONTAL_FRICTION;
    } else if (!this.gravityDisabled) {
      this.velocity.y += GRAVITY;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
  }

  disableGravity() {
    this.gravityDisabled = true;
  }

  toJSON() {
    const props = Object.fromEntries(Object.entries(this));
    return JSON.stringify(props, null, 4);
  }
}
