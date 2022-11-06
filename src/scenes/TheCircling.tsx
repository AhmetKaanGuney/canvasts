import { JSX, Setter, onMount, onCleanup, createSignal } from 'solid-js';
import { Point, Vector } from '../lib/canvas/geometry';
import Circle from '../lib/canvas/circle';
import Id from '../lib/id';
import { random, randomFloat } from '../lib/random';
import { getRandomColor, theme } from '../lib/style';
import Slider from '../components/slider/Slider';

interface TheCirclingProps {
  setControls: Setter<JSX.Element>;
}

function TheCircling(props: TheCirclingProps) {
  let centerX: number;
  let centerY: number;
  let center;
  let noVelocity;
  let centerPoint: Circle;
  let centerBoundry: Circle;
  let canvas: HTMLCanvasElement;
  let c: CanvasRenderingContext2D;
  let particles: Particle[] = [];
  const maxDistanceFromCenter = 350;

  const [particleCount, setParticleCount] = createSignal(50);
  const [trailLength, setTrailLength] = createSignal(70);

  function handleParticleCountChange(value: number) {
    setParticleCount(value);
    init();
  }

  class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    velocity: number;
    radius: number;
    fillStyle: string;
    radians = 0;
    maxDistanceFromCenter: number;
    constructor(
      x: number,
      y: number,
      radius: number,
      velocity: number,
      radiansOffset: number,
      maxDistanceFromCenter: number
    ) {
      this.x = x;
      this.y = y;
      const originOffset = radius * 1.5;
      this.originX = random(x - originOffset, x + originOffset);
      this.originY = random(y - originOffset, y + originOffset);
      this.radius = radius;
      this.fillStyle = getRandomColor();
      this.velocity = velocity;
      this.radians = radiansOffset;
      this.maxDistanceFromCenter = maxDistanceFromCenter;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.fillStyle;
      c.strokeStyle = theme.gray[80];
      c.fill();
      c.stroke();
    }

    update() {
      this.radians += this.velocity;
      this.x =
        this.originX + Math.cos(this.radians) * this.maxDistanceFromCenter;
      this.y =
        this.originY + Math.sin(this.radians) * this.maxDistanceFromCenter;

      this.draw();
    }
  }

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
    particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    center = new Point(centerX, centerY);
    noVelocity = new Vector(0, 0);
    centerPoint = new Circle(center, 5, noVelocity, canvas, {
      strokeStyle: 'red',
      fillStyle: 'red',
    });
    centerBoundry = new Circle(
      center,
      maxDistanceFromCenter,
      noVelocity,
      canvas,
      {
        strokeStyle: 'pink',
        fillStyle: 'transparent',
      }
    );

    // Generate particles
    for (let i = 0; i < particleCount(); i++) {
      const x = centerX;
      const y = centerY;
      const radius = random(5, 10);
      const radiansOffset = random(radius, radius * 1.5);
      const distanceFromCenter = random(
        maxDistanceFromCenter - radius * 10,
        maxDistanceFromCenter
      );
      const velocity = randomFloat(0.01, 0.05);

      const particle = new Particle(
        x,
        y,
        radius,
        velocity,
        radiansOffset,
        distanceFromCenter
      );
      particle.draw();
      particles.push(particle);
    }
  }

  let increment = 0;

  function animate() {
    c.fillStyle = `rgba(0,0,0, ${1 - trailLength() / 100})`;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // render center
    // centerPoint.draw();
    // centerBoundry.draw();

    // Render Circles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.update();
    }
    increment += 0.04;
    requestAnimationFrame(animate);
  }

  onMount(() => {
    init();
    animate();
  });

  onCleanup(() => {
    particles = [];
  });

  props.setControls(
    <>
      <div class='controller-item'>
        <Slider
          title='Number of particles:'
          min={1}
          max={200}
          defaultValue={particleCount()}
          onInputChange={handleParticleCountChange}
        />
      </div>
      <div class='controller-item'>
        <Slider
          title='Trail Length:'
          min={1}
          max={99}
          defaultValue={trailLength()}
          onInputChange={(val) => setTrailLength(val)}
        />
      </div>
    </>
  );

  return <canvas id='the-circling-canvas'></canvas>;
}

export default TheCircling;
