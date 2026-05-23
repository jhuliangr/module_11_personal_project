import { NUM_COLORS, TRAIL_LENGTH } from "#shared/constants";

import { type ParticleInit } from "../types";

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
  const histX = new Float32Array(count * TRAIL_LENGTH);
  const histY = new Float32Array(count * TRAIL_LENGTH);
  for (let i = 0; i < count; i++) {
    vx[i] = (Math.random() - 0.5) * 120;
    vy[i] = (Math.random() - 0.5) * 120;
    const xi = Math.random() * width;
    const yi = Math.random() * height;
    x[i] = xi;
    y[i] = yi;
    const phase = Math.random() * Math.PI * 2;
    cosPhX[i] = Math.cos(phase);
    sinPhX[i] = Math.sin(phase);
    cosPhY[i] = Math.cos(phase * 1.7);
    sinPhY[i] = Math.sin(phase * 1.7);
    colorIndex[i] = Math.floor(Math.random() * NUM_COLORS);
    const base = i * TRAIL_LENGTH;
    for (let k = 0; k < TRAIL_LENGTH; k++) {
      histX[base + k] = xi;
      histY[base + k] = yi;
    }
  }
  return {
    vx,
    vy,
    x,
    y,
    cosPhX,
    sinPhX,
    cosPhY,
    sinPhY,
    colorIndex,
    histX,
    histY,
  };
};
