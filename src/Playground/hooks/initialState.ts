import { NUM_COLORS } from "../constants";

import { type ParticleInit, type Point } from "../types";

export const buildInit = (
  count: number,
  width: number,
  height: number,
): ParticleInit => {
  const vx = new Float32Array(count);
  const vy = new Float32Array(count);
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const cosPhX = new Float32Array(count);
  const sinPhX = new Float32Array(count);
  const cosPhY = new Float32Array(count);
  const sinPhY = new Float32Array(count);
  const colorIndex = new Int8Array(count);
  for (let i = 0; i < count; i++) {
    vx[i] = (Math.random() - 0.5) * 120;
    vy[i] = (Math.random() - 0.5) * 120;
    x[i] = Math.random() * width;
    y[i] = Math.random() * height;
    const phase = Math.random() * Math.PI * 2;
    cosPhX[i] = Math.cos(phase);
    sinPhX[i] = Math.sin(phase);
    cosPhY[i] = Math.cos(phase * 1.7);
    sinPhY[i] = Math.sin(phase * 1.7);
    colorIndex[i] = Math.floor(Math.random() * NUM_COLORS);
  }
  return { vx, vy, x, y, cosPhX, sinPhX, cosPhY, sinPhY, colorIndex };
};

export const emptyBuckets = (): Point[][] => {
  const arr: Point[][] = new Array(NUM_COLORS);
  for (let i = 0; i < NUM_COLORS; i++) arr[i] = [];
  return arr;
};
