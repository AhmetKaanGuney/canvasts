import { GRAVITY, HORIZONTAL_FRICTION, VERTICAL_FRICTION } from '../constants';
import { theme } from '../style';

type CircleStyle = {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
};

export default class Circle {
  id: number;
  x = 0;
  y = 0;
  radius = 0;
  dx = 0;
  dy = 0;

  canvas: HTMLCanvasElement;
  c: CanvasRenderingContext2D;
  fillStyle = theme.gray[50];
  strokeStyle = theme.gray[90];
  strokeWidth = 1;

  constructor(
    id: number,
    pos: Point,
    radius: number,
    velocity: Velocity,
    canvas: HTMLCanvasElement,
    style?: CircleStyle
  ) {
    this.id = id;
    this.x = pos.x;
    this.y = pos.y;
    this.radius = radius;

    this.dx = velocity.dx;
    this.dy = velocity.dy;

    this.canvas = canvas;
    this.c = this.canvas.getContext('2d')!;

    if (style) {
      this.fillStyle = style.fillColor;
      this.strokeStyle = style.strokeColor;
      this.strokeWidth = style.strokeWidth;
    }
  }

  draw(): void {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.c.fillStyle = this.fillStyle;
    this.c.strokeStyle = this.strokeStyle;
    this.c.fill();
    this.c.stroke();
  }

  update(): void {
    // Collision
    const collidesLeft = this.x - this.radius + this.dx + this.strokeWidth < 0;
    const collidesRight =
      this.x + this.radius + this.dx + this.strokeWidth > this.canvas.width;
    const collidesTop = this.y - this.radius + this.dy + this.strokeWidth < 0;
    const collidesBottom =
      this.y + this.radius + this.dy + this.strokeWidth > this.canvas.height;

    if (collidesLeft || collidesRight) {
      this.dx = -this.dx * HORIZONTAL_FRICTION;
    }

    if (collidesTop) {
      this.dy = -this.dy;
    }

    if (collidesBottom) {
      this.dy = -this.dy * VERTICAL_FRICTION;
      this.dx = this.dx * HORIZONTAL_FRICTION;
    } else {
      this.dy += GRAVITY;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
