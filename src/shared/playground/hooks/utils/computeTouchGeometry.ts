import { BLACK_HOLE_OMEGA, PATTERN_OMEGA } from "../../constants";

import { type TouchGeometry } from "./types";

export const computeTouchGeometry = (
  out: TouchGeometry,
  tc: number,
  xs: Float32Array,
  ys: Float32Array,
  t: number,
): void => {
  "worklet";
  out.pcx = 0;
  out.pcy = 0;
  out.pscale = 0;
  out.cosRot = 1;
  out.sinRot = 0;
  out.cosBase = 1;
  out.sinBase = 0;
  out.cosSpin = 1;
  out.sinSpin = 0;

  if (tc === 2) {
    out.pcx = (xs[0] + xs[1]) / 2;
    out.pcy = (ys[0] + ys[1]) / 2;
    const ldx = xs[1] - xs[0];
    const ldy = ys[1] - ys[0];
    out.pscale = Math.sqrt(ldx * ldx + ldy * ldy) / 2;
    const rot = Math.atan2(ldy, ldx);
    out.cosRot = Math.cos(rot);
    out.sinRot = Math.sin(rot);
  } else if (tc >= 3) {
    let pcx = 0;
    let pcy = 0;
    for (let k = 0; k < tc; k++) {
      pcx += xs[k];
      pcy += ys[k];
    }
    pcx /= tc;
    pcy /= tc;
    out.pcx = pcx;
    out.pcy = pcy;
    let maxDist2 = 0;
    for (let k = 0; k < tc; k++) {
      const dxk = xs[k] - pcx;
      const dyk = ys[k] - pcy;
      const d2 = dxk * dxk + dyk * dyk;
      if (d2 > maxDist2) maxDist2 = d2;
    }
    out.pscale = Math.sqrt(maxDist2);
  }

  if (tc >= 2) {
    const baseAngle = t * PATTERN_OMEGA;
    out.cosBase = Math.cos(baseAngle);
    out.sinBase = Math.sin(baseAngle);
  }

  if (tc === 5) {
    const spinAngle = t * BLACK_HOLE_OMEGA;
    out.cosSpin = Math.cos(spinAngle);
    out.sinSpin = Math.sin(spinAngle);
  }
};
