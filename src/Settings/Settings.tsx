import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

import { useSettingsStore } from "#shared/stores";

export const Settings: React.FC = () => {
  const amountOfPoints = useSettingsStore((state) => state.amountOfPoints);
  const setAmountOfPoints = useSettingsStore(
    (state) => state.setAmountOfPoints,
  );

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>Amount of points: {amountOfPoints}</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={1000}
        step={1}
        value={amountOfPoints}
        onValueChange={setAmountOfPoints}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
