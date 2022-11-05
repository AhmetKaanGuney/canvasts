export function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function random(minimum: number, maximum: number) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min) + min);
}
