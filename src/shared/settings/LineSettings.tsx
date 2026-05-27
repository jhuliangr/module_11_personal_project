import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";

import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";

import { useSettings } from "./useSettings";

export const LineSettings: React.FC = () => {
  const { strokeWidth, setStrokeWidth } = useSettings();

  return (
    <View style={styles.container}>
      <Typography variant="normal">
        Line width: {strokeWidth.toFixed(1)}
        {strokeWidth > 1
          ? "  ·  band + clockwise cylindrical spin"
          : "  ·  thin line"}
      </Typography>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={12}
        step={0.2}
        value={strokeWidth}
        onValueChange={setStrokeWidth}
      />
      <Typography variant="hint">
        Widths above 1 switch the surface to a 3D band.
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.between,
    gap: spacing.tight,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
