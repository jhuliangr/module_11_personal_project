import { type SkPath } from "@shopify/react-native-skia";

export const buildTrailPath = (
  path: SkPath,
  hx: Float32Array,
  hy: Float32Array,
  base: number,
  trailLength: number,
  oldestSlot: number,
  wrapX: number,
  wrapY: number,
): void => {
  "worklet";
  let prevX = hx[base + oldestSlot];
  let prevY = hy[base + oldestSlot];
  path.moveTo(prevX, prevY);
  for (let k = 1; k < trailLength; k++) {
    const slot = (oldestSlot + k) % trailLength;
    const sx = hx[base + slot];
    const sy = hy[base + slot];
    if (Math.abs(sx - prevX) > wrapX || Math.abs(sy - prevY) > wrapY) {
      path.moveTo(sx, sy);
    } else {
      path.lineTo(sx, sy);
    }
    prevX = sx;
    prevY = sy;
  }
};
