import { Canvas, Path } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";

import { useSettings } from "#shared/settings";

import { type ParticleLayer } from "./types";

type ParticleFieldProps = {
  layers: ParticleLayer[];
};

export const ParticleField: React.FC<ParticleFieldProps> = ({ layers }) => {
  const { strokeWidth } = useSettings();
  return (
    <Canvas style={styles.canvas}>
      {layers.map((layer) => (
        <Path
          key={layer.color}
          path={layer.path}
          color={layer.color}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          strokeJoin="round"
        />
      ))}
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: "black" },
});
