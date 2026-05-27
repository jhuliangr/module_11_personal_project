import { type SkPath } from "@shopify/react-native-skia";
import { type DerivedValue } from "react-native-reanimated";

export type ParticleLayer = {
  color: string;
  path: DerivedValue<SkPath>;
};

export type ParticleInit = {
  vx: Float32Array;
  vy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  cosPhX: Float32Array;
  sinPhX: Float32Array;
  cosPhY: Float32Array;
  sinPhY: Float32Array;
  colorIndex: Int8Array;
  histX: Float32Array;
  histY: Float32Array;
};
