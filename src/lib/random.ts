// Todo add custom random and noise functions

export function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function random(min: number, max: number) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min) + _min);
}
