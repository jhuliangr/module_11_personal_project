import { Stack } from "expo-router";

const ComingSoonLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[feature]" options={{ title: "Feature details" }} />
    </Stack>
  );
};
export default ComingSoonLayout;
