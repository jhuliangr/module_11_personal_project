import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

import { useSettingsStore } from "#shared/stores";

export const LineSettings: React.FC = () => {
  const strokeWidth = useSettingsStore((state) => state.strokeWidth);
  const setStrokeWidth = useSettingsStore((state) => state.setStrokeWidth);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Line width: {strokeWidth.toFixed(1)}
        {strokeWidth > 1
          ? "  ·  band + clockwise cylindrical spin"
          : "  ·  thin line"}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={12}
        step={0.2}
        value={strokeWidth}
        onValueChange={setStrokeWidth}
      />
      <Text style={styles.hint}>
        Widths above 1 switch the surface to a 3D band.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
});
