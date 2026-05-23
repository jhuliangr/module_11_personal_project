import { Skia, type SkPath } from "@shopify/react-native-skia";

const PATH_COUNT = 5;

export const makeEmptyPaths = (): SkPath[] => {
  "worklet";
  const paths: SkPath[] = [];
  for (let i = 0; i < PATH_COUNT; i++) {
    paths.push(Skia.Path.Make());
  }
  return paths;
};
