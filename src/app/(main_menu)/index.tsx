import { Stack } from "expo-router";

import { MainMenu } from "#shared/main-menu";

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MainMenu />
    </>
  );
};

export default App;
