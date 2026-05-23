import { Stack } from "expo-router";

import { Settings } from "../../Settings";

const SettingsPage: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <Settings />
    </>
  );
};
export default SettingsPage;
