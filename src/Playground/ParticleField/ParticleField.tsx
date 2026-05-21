import { Canvas, Points } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";

import { PARTICLE_STROKE_WIDTH } from "../constants";

import { type ParticleLayer } from "../types";

type ParticleFieldProps = {
  layers: ParticleLayer[];
};

export const ParticleField: React.FC<ParticleFieldProps> = ({ layers }) => (
  <Canvas style={styles.canvas}>
    {layers.map((layer) => (
      <Points
        key={layer.color}
        points={layer.points}
        mode="points"
        color={layer.color}
        style="stroke"
        strokeWidth={PARTICLE_STROKE_WIDTH}
      />
    ))}
  </Canvas>
);

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: "black" },
});
