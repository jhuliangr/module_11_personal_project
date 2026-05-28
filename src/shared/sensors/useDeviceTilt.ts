import { useEffect } from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";

import { useSettings } from "#shared/settings";

import { subscribeDeviceMotion } from "./device-motion";

export type Tilt = { x: number; y: number };

const ZERO: Tilt = { x: 0, y: 0 };

export const useDeviceTilt = (): SharedValue<Tilt> => {
  const { motion } = useSettings();
  const tilt = useSharedValue<Tilt>(ZERO);

  useEffect(() => {
    if (motion) {
      return subscribeDeviceMotion((motion) => {
        const a = motion.accelerationIncludingGravity;
        tilt.value = { x: a.x ?? 0, y: -(a.y ?? 0) };
      });
    }
  }, [tilt, motion]);

  return tilt;
};
