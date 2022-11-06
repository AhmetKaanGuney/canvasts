import { JSX, Setter, Component, onMount, createSignal } from 'solid-js';
import { random } from '../lib/random';
import Circle from '../lib/canvas/circle';
import Slider from '../components/slider/Slider';
import Id from '../lib/id';
import { Vector, Point } from '../lib/canvas/geometry';
import { getRandomColor } from '../lib/style';

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
    canvas = document.getElementById(
      'bouncing-balls-canvas'
    ) as HTMLCanvasElement;
    c = canvas.getContext('2d')!;
    if (c === null) {
      console.error('Cannot get context!');
      return;
    }
    Id.reset();
    balls = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvasMarginBottom;

    // Generate balls
    for (let i = 0; i < ballCount(); i++) {
      const radius = random(30, 50);
      const x = random(radius + 1, canvas.width - radius);
      const y = random(radius + 1, canvas.height / 2);
      const position = new Point(x, y);
      const velocity = new Vector(random(-5, 5), 0);
      const style = {
        fillStyle: getRandomColor(),
      };
      const ball = new Circle(position, radius, velocity, canvas, style);

      ball.draw();
      balls.push(ball);
    }
  }

  function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Render Circles
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      if (ball) {
        ball.update();
      }
    }
    requestAnimationFrame(animate);
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
      <canvas id='bouncing-balls-canvas'></canvas>
      <div id='bouncing-balls-floor' />
    </>
  );
};

export default BouncingBalls;
