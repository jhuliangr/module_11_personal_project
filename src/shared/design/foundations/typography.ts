import { type TextStyle } from "react-native";

import { muted as mutedColor, subtle as subtleColor } from "./colors";

const baseSize = 16;

export const normal: TextStyle = {
  fontSize: baseSize,
};

export const large: TextStyle = {
  fontSize: baseSize * 1.25,
};

export const muted: TextStyle = {
  fontSize: baseSize,
  color: mutedColor,
};

export const label: TextStyle = {
  fontSize: baseSize * 0.875,
  fontWeight: "bold",
};

export const title: TextStyle = {
  fontSize: baseSize * 2,
  fontWeight: "700",
};

export const hint: TextStyle = {
  fontSize: baseSize * 0.8125,
  color: subtleColor,
};
