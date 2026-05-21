import { StyleSheet, useWindowDimensions } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { useSettingsStore } from "#shared/stores";

import { useParticleSimulation, useTouchTracking } from "./hooks";
import { ParticleField } from "./ParticleField";

export const Playground: React.FC = () => {
  const amountOfPoints = useSettingsStore((state) => state.amountOfPoints);
  const { width, height } = useWindowDimensions();

  const { touchXs, touchYs, touchCount, gesture } = useTouchTracking();
  const layers = useParticleSimulation({
    count: amountOfPoints,
    width,
    height,
    touchXs,
    touchYs,
    touchCount,
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <GestureDetector gesture={gesture}>
        <ParticleField layers={layers} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "black" },
});
