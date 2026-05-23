import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

import { useSettingsStore } from "#shared/stores";

export const PointsSettings: React.FC = () => {
  const amountOfPoints = useSettingsStore((state) => state.amountOfPoints);
  const setAmountOfPoints = useSettingsStore(
    (state) => state.setAmountOfPoints,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount of points: {amountOfPoints}</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={1000}
        step={1}
        value={amountOfPoints}
        onValueChange={setAmountOfPoints}
      />
      <Text style={styles.hint}>
        More points means a smoother curve at the cost of performance.
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
