import { ATTRACTION, SHAPE_SPRING, SOFTENING, SWIRL } from "../../constants";

import { type Vec2 } from "./types";

export const applyTouchForce = (
  velocity: Vec2,
  dx: number,
  dy: number,
  tc: number,
  dt: number,
): void => {
  "worklet";
  if (tc >= 3) {
    velocity.x += dx * SHAPE_SPRING * dt;
    velocity.y += dy * SHAPE_SPRING * dt;
    return;
  }

  const distSq = dx * dx + dy * dy + SOFTENING;
  const invDist = 1 / Math.sqrt(distSq);
  const force = ATTRACTION / distSq;
  const nx = dx * invDist;
  const ny = dy * invDist;
  velocity.x += nx * force * dt;
  velocity.y += ny * force * dt;

  if (tc === 1) {
    velocity.x += ny * SWIRL * dt;
    velocity.y -= nx * SWIRL * dt;
  }
};
