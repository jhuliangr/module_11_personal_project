import { StyleSheet, useWindowDimensions } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { useDeviceTilt } from "#shared/sensors";
import { useSettings } from "#shared/settings";

import { useParticleSimulation, useTouchTracking } from "./hooks";
import { ParticleField } from "./ParticleField";

export const Playground: React.FC = () => {
  const { amountOfPoints } = useSettings();
  const { width, height } = useWindowDimensions();

  const { touchXs, touchYs, touchCount, gesture } = useTouchTracking();
  const tilt = useDeviceTilt();
  const layers = useParticleSimulation({
    count: amountOfPoints,
    width,
    height,
    touchXs,
    touchYs,
    touchCount,
    tilt,
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
