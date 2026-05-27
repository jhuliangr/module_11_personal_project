import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";

import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";

import { useSettings } from "./useSettings";

export const PointsSettings: React.FC = () => {
  const { amountOfPoints, setAmountOfPoints } = useSettings();

  return (
    <View style={styles.container}>
      <Typography variant="normal">
        Amount of points: {amountOfPoints}
      </Typography>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={1000}
        step={1}
        value={amountOfPoints}
        onValueChange={setAmountOfPoints}
      />
      <Typography variant="hint">
        More points means a smoother curve at the cost of performance.
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
