export type Vec2 = {
  x: number;
  y: number;
};

export type TouchGeometry = {
  pcx: number;
  pcy: number;
  pscale: number;
  cosRot: number;
  sinRot: number;
  cosBase: number;
  sinBase: number;
  cosSpin: number;
  sinSpin: number;
};

export const makeTouchGeometryScratch = (): TouchGeometry => {
  "worklet";
  return {
    pcx: 0,
    pcy: 0,
    pscale: 0,
    cosRot: 1,
    sinRot: 0,
    cosBase: 1,
    sinBase: 0,
    cosSpin: 1,
    sinSpin: 0,
  };
};

export const makeVec2Scratch = (): Vec2 => {
  "worklet";
  return { x: 0, y: 0 };
};
