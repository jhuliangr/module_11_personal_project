import {
  FRICTION_FREE,
  FRICTION_TOUCHED,
  SHAPE_FRICTION,
} from "../../constants";

export const computeFriction = (touchCount: number): number => {
  "worklet";
  if (touchCount === 0) return FRICTION_FREE;
  if (touchCount >= 3) return SHAPE_FRICTION;
  return FRICTION_TOUCHED;
};
