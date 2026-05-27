import { Stack } from "expo-router";

import { Playground } from "#shared/playground";

const App: React.FC = () => {
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

export default App;
