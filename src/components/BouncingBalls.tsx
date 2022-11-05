import { JSX, Setter, Component, onMount, createSignal } from 'solid-js';
import { random } from '../lib/random';
import Circle from '../lib/canvas/circle';
import Slider from './slider/Slider';
import Checkbox from './checkbox/Checkbox';
import DisplayValue from './display-value/DisplayValue';

let _id = 0;
function getId() {
  return _id++;
}

const BouncingBalls: Component<{ setControls: Setter<JSX.Element> }> = (
  props
) => {
  const [ballCount, setBallCount] = createSignal(50);

  let canvas: HTMLCanvasElement;
  let c: CanvasRenderingContext2D;
  const canvasMarginBottom = 40;
  let balls: Circle[] = [];

  function handleBallCountChange(count: number) {
    setBallCount(count);
    init();
  }

  function init() {
    balls = [];
    canvas = document.getElementById('root-canvas') as HTMLCanvasElement;
    c = canvas.getContext('2d')!;
    if (c === null) {
      console.error('Cannot get context!');

      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvasMarginBottom;

    // Generate balls
    for (let i = 0; i < ballCount(); i++) {
      const radius = random(30, 50);
      const x = random(radius + 1, canvas.width - radius);
      const y = random(radius + 1, canvas.height / 2);
      const dx = random(-5, 5);
      const dy = 0;
      const circle = new Circle(getId(), { x, y }, radius, { dx, dy }, canvas);
      circle.draw();

      balls.push(circle);
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    // Render Circles
    for (let i = 0; i < balls.length; i++) {
      const circle = balls[i];
      if (circle) {
        circle.update();
      }
    }
  }

  onMount(() => {
    init();
    animate();
  });

  props.setControls(
    <>
      <div class='controller-item'>
        <Slider
          title='Number of Balls:'
          min={1}
          max={100}
          defaultValue={50}
          onInputChange={handleBallCountChange}
        />
      </div>
    </>
  );

  return (
    <>
      <canvas id='root-canvas'></canvas>
      <div id='floor' />
    </>
  );
};

export default BouncingBalls;
