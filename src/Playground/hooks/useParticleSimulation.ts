import { useEffect, useMemo } from "react";
import {
  type SharedValue,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import {
  ATTRACTION,
  COLORS,
  FRICTION_FREE,
  FRICTION_TOUCHED,
  MAX_SPEED,
  PATTERN_OMEGA,
  SOFTENING,
  SWIRL,
  WANDER_AMP,
  WANDER_FREQ_X,
  WANDER_FREQ_Y,
} from "../constants";
import { type ParticleLayer, type Point } from "../types";

import { buildInit, emptyBuckets } from "./initialState";

type UseParticleSimulationArgs = {
  count: number;
  width: number;
  height: number;
  touchXs: SharedValue<Float32Array>;
  touchYs: SharedValue<Float32Array>;
  touchCount: SharedValue<number>;
};

export const useParticleSimulation = ({
  count,
  width,
  height,
  touchXs,
  touchYs,
  touchCount,
}: UseParticleSimulationArgs): ParticleLayer[] => {
  const initial = useMemo(
    () => buildInit(count, width, height),
    [count, width, height],
  );

  const vxArr = useSharedValue<Float32Array>(initial.vx);
  const vyArr = useSharedValue<Float32Array>(initial.vy);
  const xArr = useSharedValue<Float32Array>(initial.x);
  const yArr = useSharedValue<Float32Array>(initial.y);
  const cosPhX = useSharedValue<Float32Array>(initial.cosPhX);
  const sinPhX = useSharedValue<Float32Array>(initial.sinPhX);
  const cosPhY = useSharedValue<Float32Array>(initial.cosPhY);
  const sinPhY = useSharedValue<Float32Array>(initial.sinPhY);
  const colorIdx = useSharedValue<Int8Array>(initial.colorIndex);
  const buckets = useSharedValue<Point[][]>(emptyBuckets());
  const time = useSharedValue(0);

  useEffect(() => {
    vxArr.value = initial.vx;
    vyArr.value = initial.vy;
    xArr.value = initial.x;
    yArr.value = initial.y;
    cosPhX.value = initial.cosPhX;
    sinPhX.value = initial.sinPhX;
    cosPhY.value = initial.cosPhY;
    sinPhY.value = initial.sinPhY;
    colorIdx.value = initial.colorIndex;
    buckets.value = emptyBuckets();
  }, [
    initial,
    vxArr,
    vyArr,
    xArr,
    yArr,
    cosPhX,
    sinPhX,
    cosPhY,
    sinPhY,
    colorIdx,
    buckets,
  ]);

  useFrameCallback((frame) => {
    const dt = Math.min((frame.timeSincePreviousFrame ?? 16) / 1000, 0.05);
    time.value += dt;
    const t = time.value;
    const xs = touchXs.value;
    const ys = touchYs.value;
    const tc = touchCount.value;
    const hasTouch = tc > 0;
    const w = width;
    const h = height;
    const vx = vxArr.value;
    const vy = vyArr.value;
    const x = xArr.value;
    const y = yArr.value;
    const cpx = cosPhX.value;
    const spx = sinPhX.value;
    const cpy = cosPhY.value;
    const spy = sinPhY.value;
    const cIdx = colorIdx.value;
    const n = vx.length;

    const cosTx = Math.cos(t * WANDER_FREQ_X);
    const sinTx = Math.sin(t * WANDER_FREQ_X);
    const cosTy = Math.cos(t * WANDER_FREQ_Y);
    const sinTy = Math.sin(t * WANDER_FREQ_Y);
    const friction = hasTouch ? FRICTION_TOUCHED : FRICTION_FREE;
    const maxSpeedSq = MAX_SPEED * MAX_SPEED;

    let pcx = 0;
    let pcy = 0;
    let pscale = 0;
    let cosRot = 1;
    let sinRot = 0;
    let cosBase = 1;
    let sinBase = 0;

    if (tc === 2) {
      pcx = (xs[0] + xs[1]) / 2;
      pcy = (ys[0] + ys[1]) / 2;
      const ldx = xs[1] - xs[0];
      const ldy = ys[1] - ys[0];
      pscale = Math.sqrt(ldx * ldx + ldy * ldy) / 2;
      const rot = Math.atan2(ldy, ldx);
      cosRot = Math.cos(rot);
      sinRot = Math.sin(rot);
    } else if (tc >= 3) {
      for (let k = 0; k < tc; k++) {
        pcx += xs[k];
        pcy += ys[k];
      }
      pcx /= tc;
      pcy /= tc;
      let maxDist2 = 0;
      for (let k = 0; k < tc; k++) {
        const dxk = xs[k] - pcx;
        const dyk = ys[k] - pcy;
        const d2 = dxk * dxk + dyk * dyk;
        if (d2 > maxDist2) maxDist2 = d2;
      }
      pscale = Math.sqrt(maxDist2);
    }

    if (tc >= 2 && tc <= 4) {
      const baseAngle = t * PATTERN_OMEGA;
      cosBase = Math.cos(baseAngle);
      sinBase = Math.sin(baseAngle);
    }

    const newBuckets: Point[][] = [[], [], [], [], [], []];

    for (let i = 0; i < n; i++) {
      const px = x[i];
      const py = y[i];
      let vxi = vx[i];
      let vyi = vy[i];

      const wx = cosTx * cpx[i] - sinTx * spx[i];
      const wy = sinTy * cpy[i] + cosTy * spy[i];
      vxi += wx * WANDER_AMP * dt;
      vyi += wy * WANDER_AMP * dt;

      if (hasTouch) {
        let targetX = 0;
        let targetY = 0;

        if (tc === 1) {
          targetX = xs[0];
          targetY = ys[0];
        } else if (tc === 2) {
          const cosTheta = cosBase * cpx[i] - sinBase * spx[i];
          const sinTheta = sinBase * cpx[i] + cosBase * spx[i];
          const denom = 1 + sinTheta * sinTheta;
          const lx = cosTheta / denom;
          const ly = (sinTheta * cosTheta) / denom;
          targetX = pcx + pscale * (cosRot * lx - sinRot * ly);
          targetY = pcy + pscale * (sinRot * lx + cosRot * ly);
        } else if (tc === 3) {
          const cosTheta = cosBase * cpx[i] - sinBase * spx[i];
          const sinTheta = sinBase * cpx[i] + cosBase * spx[i];
          const cos2 = cosTheta * cosTheta - sinTheta * sinTheta;
          const sin2 = 2 * sinTheta * cosTheta;
          const lx = sinTheta + 2 * sin2;
          const ly = cosTheta - 2 * cos2;
          const k = pscale / 3;
          targetX = pcx + k * lx;
          targetY = pcy + k * ly;
        } else if (tc === 4) {
          const cosTheta = cosBase * cpx[i] - sinBase * spx[i];
          const sinTheta = sinBase * cpx[i] + cosBase * spx[i];
          const cos2 = cosTheta * cosTheta - sinTheta * sinTheta;
          const lx = cos2 * cosTheta;
          const ly = cos2 * sinTheta;
          targetX = pcx + pscale * lx;
          targetY = pcy + pscale * ly;
        } else {
          const fingerIdx = i % 5;
          targetX = xs[fingerIdx];
          targetY = ys[fingerIdx];
        }

        const dx = targetX - px;
        const dy = targetY - py;
        const distSq = dx * dx + dy * dy + SOFTENING;
        const invDist = 1 / Math.sqrt(distSq);
        const force = ATTRACTION / distSq;
        const nx = dx * invDist;
        const ny = dy * invDist;
        vxi += nx * force * dt;
        vyi += ny * force * dt;

        if (tc === 1 || tc === 5) {
          vxi += ny * SWIRL * dt;
          vyi -= nx * SWIRL * dt;
        }
      }

      vxi *= friction;
      vyi *= friction;

      const speedSq = vxi * vxi + vyi * vyi;
      if (speedSq > maxSpeedSq) {
        const scale = MAX_SPEED / Math.sqrt(speedSq);
        vxi *= scale;
        vyi *= scale;
      }

      let nxp = px + vxi * dt;
      let nyp = py + vyi * dt;

      if (nxp < 0) nxp += w;
      else if (nxp > w) nxp -= w;
      if (nyp < 0) nyp += h;
      else if (nyp > h) nyp -= h;

      vx[i] = vxi;
      vy[i] = vyi;
      x[i] = nxp;
      y[i] = nyp;

      newBuckets[cIdx[i]].push({ x: nxp, y: nyp });
    }

    buckets.value = newBuckets;
  });

  const b0 = useDerivedValue(() => buckets.value[0]);
  const b1 = useDerivedValue(() => buckets.value[1]);
  const b2 = useDerivedValue(() => buckets.value[2]);
  const b3 = useDerivedValue(() => buckets.value[3]);
  const b4 = useDerivedValue(() => buckets.value[4]);
  const b5 = useDerivedValue(() => buckets.value[5]);

  return [
    { color: COLORS[0], points: b0 },
    { color: COLORS[1], points: b1 },
    { color: COLORS[2], points: b2 },
    { color: COLORS[3], points: b3 },
    { color: COLORS[4], points: b4 },
    { color: COLORS[5], points: b5 },
  ];
};
