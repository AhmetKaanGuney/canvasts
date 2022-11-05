import { random } from './random';

const text = {
  primary: 'rgba(255, 255, 255, 0.9)',
  secondary: 'rgba(255, 255, 255, 0.68)',
  muted: 'rgba(255, 255, 255, 0.32)',
};

const background = {
  primary: '#203560',
  secondary: '#383a3e',
  danger: '#750000',
  warning: '#9b5208',
  info: '#9b8308',
  success: '#0a5c33',
};

const gray = {
  10: '#f2f2f2',
  20: '#e0e0e0',
  30: '#c7c7c7',
  40: '#adadad',
  50: '#8a8a8a',
  60: '#6e6e6e',
  70: '#525252',
  80: '#3b3b3b',
  90: '#292929',
  100: '#171717',
};

export const white = (percentage: number) => {
  return `rgba(255,255,255, ${percentage}%)`;
};

export const theme = {
  primary: '#29447a',
  primaryLight: '#4b73c3',
  secondary: '#383a3e',
  success: '#16c56e',
  danger: '#ff4a4a',
  warning: '#f2800d',
  info: '#dab80b',
  link: '#6699ff',
  text: text,
  bg: background,
  gray: gray,
};

const colorPalette = [
  '#BA5E8C',
  '#C65370',
  '#D65C5C',
  '#EE7E59',
  '#EB9947',
  '#E8BA30',
];

export function getRandomColor() {
  return colorPalette[random(0, colorPalette.length)];
}

// export function getRandomParticleColor() {
//   const palette = ['#4D6680', '#4D7F80', '#4D8066'];
//   return palette[random(0, palette.length)];
// }
