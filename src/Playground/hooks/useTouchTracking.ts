import { useMemo } from "react";
import {
  type ComposedGesture,
  Gesture,
  type GestureType,
} from "react-native-gesture-handler";
import { type SharedValue, useSharedValue } from "react-native-reanimated";

import { MAX_TOUCHES } from "#shared/constants";

type UseTouchTrackingResult = {
  touchXs: SharedValue<Float32Array>;
  touchYs: SharedValue<Float32Array>;
  touchCount: SharedValue<number>;
  gesture: GestureType | ComposedGesture;
};

export const useTouchTracking = (): UseTouchTrackingResult => {
  const touchXs = useSharedValue<Float32Array>(new Float32Array(MAX_TOUCHES));
  const touchYs = useSharedValue<Float32Array>(new Float32Array(MAX_TOUCHES));
  const touchCount = useSharedValue(0);

  const gesture = useMemo(
    () =>
      Gesture.Manual()
        .onTouchesDown((e, stateManager) => {
          stateManager.activate();
          const xs = touchXs.value;
          const ys = touchYs.value;
          const count = Math.min(e.allTouches.length, MAX_TOUCHES);
          for (let i = 0; i < count; i++) {
            xs[i] = e.allTouches[i].x;
            ys[i] = e.allTouches[i].y;
          }
          touchCount.value = count;
        })
        .onTouchesMove((e) => {
          const xs = touchXs.value;
          const ys = touchYs.value;
          const count = Math.min(e.allTouches.length, MAX_TOUCHES);
          for (let i = 0; i < count; i++) {
            xs[i] = e.allTouches[i].x;
            ys[i] = e.allTouches[i].y;
          }
          touchCount.value = count;
        })
        .onTouchesUp((e, stateManager) => {
          const xs = touchXs.value;
          const ys = touchYs.value;
          let count = 0;
          for (const touch of e.allTouches) {
            if (count >= MAX_TOUCHES) break;
            const wasLifted = e.changedTouches.some((c) => c.id === touch.id);
            if (!wasLifted) {
              xs[count] = touch.x;
              ys[count] = touch.y;
              count++;
            }
          }
          touchCount.value = count;
          if (count === 0) {
            stateManager.end();
          }
        })
        .onTouchesCancelled((_e, stateManager) => {
          touchCount.value = 0;
          stateManager.end();
        }),
    [touchXs, touchYs, touchCount],
  );

  return { touchXs, touchYs, touchCount, gesture };
};
