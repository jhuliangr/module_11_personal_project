import { type SkPath } from "@shopify/react-native-skia";
import { type DerivedValue } from "react-native-reanimated";

export type ParticleLayer = {
  color: string;
  path: DerivedValue<SkPath>;
};
