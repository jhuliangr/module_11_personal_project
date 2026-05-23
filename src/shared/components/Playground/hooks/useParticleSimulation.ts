import { useMemo } from "react";
import {
  type SharedValue,
  useDerivedValue,
  useFrameCallback,
} from "react-native-reanimated";

import {
  COLORS,
  MAX_SPEED,
  TRAIL_LENGTH,
  WANDER_AMP,
  WANDER_FREQ_X,
  WANDER_FREQ_Y,
} from "#shared/constants";
import { type ParticleLayer } from "#shared/types";

import { buildInit } from "./initialState";
import { useParticleSharedValues } from "./useParticleSharedValues";
import {
  applyTouchForce,
  buildTrailPath,
  computeFriction,
  computeParticleTarget,
  computeTouchGeometry,
  makeEmptyPaths,
  makeTouchGeometryScratch,
  makeVec2Scratch,
} from "./utils";

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

  const state = useParticleSharedValues(initial);

  const wrapX = width * 0.5;
  const wrapY = height * 0.5;

  useFrameCallback((frame) => {
    const dt = Math.min((frame.timeSincePreviousFrame ?? 16) / 1000, 0.05);
    state.time.value += dt;
    const t = state.time.value;

    const xs = touchXs.value;
    const ys = touchYs.value;
    const tc = touchCount.value;
    const hasTouch = tc > 0;

    const vx = state.vxArr.value;
    const vy = state.vyArr.value;
    const x = state.xArr.value;
    const y = state.yArr.value;
    const cpx = state.cosPhX.value;
    const spx = state.sinPhX.value;
    const cpy = state.cosPhY.value;
    const spy = state.sinPhY.value;
    const hx = state.histX.value;
    const hy = state.histY.value;
    const cIdx = state.colorIdx.value;
    const K = TRAIL_LENGTH;
    const head = state.histHead.value;
    const n = vx.length;

    const cosTx = Math.cos(t * WANDER_FREQ_X);
    const sinTx = Math.sin(t * WANDER_FREQ_X);
    const cosTy = Math.cos(t * WANDER_FREQ_Y);
    const sinTy = Math.sin(t * WANDER_FREQ_Y);
    const friction = computeFriction(tc);
    const maxSpeedSq = MAX_SPEED * MAX_SPEED;
    const wanderAmpDt = WANDER_AMP * dt;
    const galaxyTwist = t * 0.4;

    const geom = makeTouchGeometryScratch();
    computeTouchGeometry(geom, tc, xs, ys, t);

    const target = makeVec2Scratch();
    const velocity = makeVec2Scratch();

    const newPaths = makeEmptyPaths();
    const oldestSlot = (head + 1) % K;

    for (let i = 0; i < n; i++) {
      const px = x[i];
      const py = y[i];
      velocity.x = vx[i];
      velocity.y = vy[i];

      const wx = cosTx * cpx[i] - sinTx * spx[i];
      const wy = sinTy * cpy[i] + cosTy * spy[i];
      velocity.x += wx * wanderAmpDt;
      velocity.y += wy * wanderAmpDt;

      if (hasTouch) {
        computeParticleTarget(
          target,
          tc,
          geom,
          i,
          cpx,
          spx,
          cIdx,
          xs,
          ys,
          galaxyTwist,
        );
        applyTouchForce(velocity, target.x - px, target.y - py, tc, dt);
      }

      velocity.x *= friction;
      velocity.y *= friction;

      const speedSq = velocity.x * velocity.x + velocity.y * velocity.y;
      if (speedSq > maxSpeedSq) {
        const scale = MAX_SPEED / Math.sqrt(speedSq);
        velocity.x *= scale;
        velocity.y *= scale;
      }

      let nxp = px + velocity.x * dt;
      let nyp = py + velocity.y * dt;
      if (nxp < 0) nxp += width;
      else if (nxp > width) nxp -= width;
      if (nyp < 0) nyp += height;
      else if (nyp > height) nyp -= height;

      vx[i] = velocity.x;
      vy[i] = velocity.y;
      x[i] = nxp;
      y[i] = nyp;

      const base = i * K;
      hx[base + head] = nxp;
      hy[base + head] = nyp;

      buildTrailPath(
        newPaths[cIdx[i]],
        hx,
        hy,
        base,
        K,
        oldestSlot,
        wrapX,
        wrapY,
      );
    }

    state.histHead.value = (head + 1) % K;
    state.pathsSV.value = newPaths;
  });

  const path0 = useDerivedValue(() => state.pathsSV.value[0]);
  const path1 = useDerivedValue(() => state.pathsSV.value[1]);
  const path2 = useDerivedValue(() => state.pathsSV.value[2]);
  const path3 = useDerivedValue(() => state.pathsSV.value[3]);
  const path4 = useDerivedValue(() => state.pathsSV.value[4]);

  return [
    { color: COLORS[0], path: path0 },
    { color: COLORS[1], path: path1 },
    { color: COLORS[2], path: path2 },
    { color: COLORS[3], path: path3 },
    { color: COLORS[4], path: path4 },
  ];
};
