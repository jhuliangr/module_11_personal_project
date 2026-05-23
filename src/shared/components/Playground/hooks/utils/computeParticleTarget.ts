import { MAX_TOUCHES } from "#shared/constants";

import { type TouchGeometry, type Vec2 } from "./types";

export const computeParticleTarget = (
  out: Vec2,
  tc: number,
  geom: TouchGeometry,
  i: number,
  cpx: Float32Array,
  spx: Float32Array,
  cIdx: Int8Array,
  xs: Float32Array,
  ys: Float32Array,
  galaxyTwist: number,
): void => {
  "worklet";
  const pcx = geom.pcx;
  const pcy = geom.pcy;
  const pscale = geom.pscale;
  const cosRot = geom.cosRot;
  const sinRot = geom.sinRot;
  const cosBase = geom.cosBase;
  const sinBase = geom.sinBase;
  const cosSpin = geom.cosSpin;
  const sinSpin = geom.sinSpin;
  const cpxi = cpx[i];
  const spxi = spx[i];

  if (tc === 1) {
    out.x = xs[0];
    out.y = ys[0];
    return;
  }
  if (tc === 2) {
    const cosTheta = cosBase * cpxi - sinBase * spxi;
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const denom = 1 + sinTheta * sinTheta;
    const lx = cosTheta / denom;
    const ly = (sinTheta * cosTheta) / denom;
    out.x = pcx + pscale * (cosRot * lx - sinRot * ly);
    out.y = pcy + pscale * (sinRot * lx + cosRot * ly);
    return;
  }
  if (tc === 3) {
    const cosTheta = cosBase * cpxi - sinBase * spxi;
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const cos2 = cosTheta * cosTheta - sinTheta * sinTheta;
    const sin2 = 2 * sinTheta * cosTheta;
    const lx = (2 * cosTheta + cos2) / 3;
    const ly = (2 * sinTheta - sin2) / 3;
    out.x = pcx + pscale * lx;
    out.y = pcy + pscale * ly;
    return;
  }
  if (tc === 4) {
    const cosTheta = cosBase * cpxi - sinBase * spxi;
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const lx = cosTheta * cosTheta * cosTheta;
    const ly = sinTheta * sinTheta * sinTheta;
    out.x = pcx + pscale * lx;
    out.y = pcy + pscale * ly;
    return;
  }
  if (tc === 5) {
    const cosTheta = cosSpin * cpxi - sinSpin * spxi;
    const sinTheta = sinSpin * cpxi + cosSpin * spxi;
    const r = pscale * 0.18;
    out.x = pcx + r * cosTheta;
    out.y = pcy + r * sinTheta;
    return;
  }
  if (tc === 6) {
    const cosTheta = cosBase * cpxi - sinBase * spxi;
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const cos2t = cosTheta * cosTheta - sinTheta * sinTheta;
    const sin2t = 2 * sinTheta * cosTheta;
    const cos3t = cos2t * cosTheta - sin2t * sinTheta;
    const sin3t = sin2t * cosTheta + cos2t * sinTheta;
    const cos6t = cos3t * cos3t - sin3t * sin3t;
    const r = pscale * (1 + 0.4 * cos6t);
    out.x = pcx + r * cosTheta;
    out.y = pcy + r * sinTheta;
    return;
  }
  if (tc === 7) {
    const cosTheta = cosBase * cpxi - sinBase * spxi;
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const r = cIdx[i] < 2 ? pscale * 0.12 : pscale * 0.95;
    out.x = pcx + r * cosTheta;
    out.y = pcy + r * sinTheta;
    return;
  }
  if (tc === 8) {
    const sinTheta = sinBase * cpxi + cosBase * spxi;
    const s = (sinTheta + 1) * 0.5;
    const arm = cIdx[i];
    const spiralAngle = (arm * Math.PI) / 3 + 4 * Math.PI * s + galaxyTwist;
    const r = pscale * (0.05 + 0.95 * s);
    out.x = pcx + r * Math.cos(spiralAngle);
    out.y = pcy + r * Math.sin(spiralAngle);
    return;
  }

  const fingerIdx = i % MAX_TOUCHES;
  out.x = xs[fingerIdx];
  out.y = ys[fingerIdx];
};
