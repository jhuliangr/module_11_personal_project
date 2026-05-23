import { Stack } from "expo-router";

import { Playground } from "#shared/components/Playground";

const PlaygroundPage: React.FC = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerBackground: () => <></>,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Playground />
    </>
  );
};
export default PlaygroundPage;
