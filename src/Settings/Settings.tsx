import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

import { useSettingsStore } from "#shared/stores";

export const Settings: React.FC = () => {
  const amountOfPoints = useSettingsStore((state) => state.amountOfPoints);
  const setAmountOfPoints = useSettingsStore(
    (state) => state.setAmountOfPoints,
  );
  const strokeWidth = useSettingsStore((state) => state.strokeWidth);
  const setStrokeWidth = useSettingsStore((state) => state.setStrokeWidth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.label}>Amount of points: {amountOfPoints}</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={1000}
        step={1}
        value={amountOfPoints}
        onValueChange={setAmountOfPoints}
      />

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
        step={0.5}
        value={strokeWidth}
        onValueChange={setStrokeWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
