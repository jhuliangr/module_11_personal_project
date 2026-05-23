import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(main_menu)/index"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
};
export default Layout;
