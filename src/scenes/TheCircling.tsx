import { JSX, Setter, onMount } from 'solid-js';
import { Point, Vector } from '../lib/canvas/geometry';
import Circle from '../lib/canvas/circle';
import Id from '../lib/id';
import { random } from '../lib/random';
import { getRandomColor } from '../lib/style';

interface TheCirclingProps {
  setControls: Setter<JSX.Element>;
}

function TheCircling(props: TheCirclingProps) {
  let canvas: HTMLCanvasElement;
  let c: CanvasRenderingContext2D;
  let circles: Circle[] = [];
  const circleCount = 1;

  function init() {
    canvas = document.getElementById(
      'the-circling-canvas'
    ) as HTMLCanvasElement;
    c = canvas.getContext('2d')!;
    if (c === null) {
      console.error('Cannot get context!');
      return;
    }
    Id.reset();
    circles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate circles
    for (let i = 0; i < circleCount; i++) {
      const radius = random(30, 50);
      const x = random(radius + 1, canvas.width - radius);
      const y = random(radius + 1, canvas.height / 2);
      const position = new Point(x, y);
      const velocity = new Vector(random(-5, 5), 0);
      const style = {
        fillStyle: getRandomColor(),
      };
      const circle = new Circle(position, radius, velocity, canvas, style);

      circle.draw();
      circles.push(circle);
    }
  }
  function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Render Circles
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      if (circle) {
        circle.update();
      }
    }
    requestAnimationFrame(animate);
  }

  onMount(() => {
    init();
    animate();
  });

  props.setControls('');

  return (
    <>
      <canvas id='the-circling-canvas'></canvas>
    </>
  );
}

export default TheCircling;
