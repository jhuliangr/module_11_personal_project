import { Stack } from "expo-router";

import { MainMenu } from "../../MainMenu";

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Main Menu" }} />
      <MainMenu />
    </>
  );
};
export default App;
