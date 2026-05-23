import { Canvas, Path } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";

import { PARTICLE_STROKE_WIDTH } from "#shared/constants";
import { type ParticleLayer } from "#shared/types";

type ParticleFieldProps = {
  layers: ParticleLayer[];
};

export const ParticleField: React.FC<ParticleFieldProps> = ({ layers }) => (
  <Canvas style={styles.canvas}>
    {layers.map((layer) => (
      <Path
        key={layer.color}
        path={layer.path}
        color={layer.color}
        style="stroke"
        strokeWidth={PARTICLE_STROKE_WIDTH}
        strokeCap="round"
        strokeJoin="round"
      />
    ))}
  </Canvas>
);

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: "black" },
});
