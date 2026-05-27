import { type SkPath } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";

import { type ParticleInit } from "../types";

import { makeEmptyPaths } from "./utils/makeEmptyPaths";

export type ParticleSharedValues = {
  vxArr: SharedValue<Float32Array>;
  vyArr: SharedValue<Float32Array>;
  xArr: SharedValue<Float32Array>;
  yArr: SharedValue<Float32Array>;
  cosPhX: SharedValue<Float32Array>;
  sinPhX: SharedValue<Float32Array>;
  cosPhY: SharedValue<Float32Array>;
  sinPhY: SharedValue<Float32Array>;
  colorIdx: SharedValue<Int8Array>;
  histX: SharedValue<Float32Array>;
  histY: SharedValue<Float32Array>;
  histHead: SharedValue<number>;
  time: SharedValue<number>;
  pathsSV: SharedValue<SkPath[]>;
};

export const useParticleSharedValues = (
  initial: ParticleInit,
): ParticleSharedValues => {
  const vxArr = useSharedValue<Float32Array>(initial.vx);
  const vyArr = useSharedValue<Float32Array>(initial.vy);
  const xArr = useSharedValue<Float32Array>(initial.x);
  const yArr = useSharedValue<Float32Array>(initial.y);
  const cosPhX = useSharedValue<Float32Array>(initial.cosPhX);
  const sinPhX = useSharedValue<Float32Array>(initial.sinPhX);
  const cosPhY = useSharedValue<Float32Array>(initial.cosPhY);
  const sinPhY = useSharedValue<Float32Array>(initial.sinPhY);
  const colorIdx = useSharedValue<Int8Array>(initial.colorIndex);
  const histX = useSharedValue<Float32Array>(initial.histX);
  const histY = useSharedValue<Float32Array>(initial.histY);
  const histHead = useSharedValue(0);
  const time = useSharedValue(0);
  const pathsSV = useSharedValue<SkPath[]>(makeEmptyPaths());

  useEffect(() => {
    vxArr.value = initial.vx;
    vyArr.value = initial.vy;
    xArr.value = initial.x;
    yArr.value = initial.y;
    cosPhX.value = initial.cosPhX;
    sinPhX.value = initial.sinPhX;
    cosPhY.value = initial.cosPhY;
    sinPhY.value = initial.sinPhY;
    colorIdx.value = initial.colorIndex;
    histX.value = initial.histX;
    histY.value = initial.histY;
    histHead.value = 0;
  }, [
    initial,
    vxArr,
    vyArr,
    xArr,
    yArr,
    cosPhX,
    sinPhX,
    cosPhY,
    sinPhY,
    colorIdx,
    histX,
    histY,
    histHead,
  ]);

  return {
    vxArr,
    vyArr,
    xArr,
    yArr,
    cosPhX,
    sinPhX,
    cosPhY,
    sinPhY,
    colorIdx,
    histX,
    histY,
    histHead,
    time,
    pathsSV,
  };
};
