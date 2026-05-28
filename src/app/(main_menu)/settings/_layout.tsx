import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Pressable, StyleSheet, Text } from "react-native";

const HeaderBack: React.FC = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
      hitSlop={12}
      style={styles.headerButton}
    >
      <Text style={styles.headerIcon}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Text>
    </Pressable>
  );
};

const HeaderMenu: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      hitSlop={12}
      style={styles.headerButton}
      accessibilityRole="button"
      accessibilityLabel="Open settings menu"
    >
      <Text style={styles.headerIcon}>☰</Text>
    </Pressable>
  );
};

const SettingsLayout: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Drawer
        screenOptions={{
          headerLeft: () => <HeaderBack />,
          headerRight: () => <HeaderMenu />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{ title: "Points", drawerLabel: "Amount of points" }}
        />
        <Drawer.Screen
          name="line"
          options={{ title: "Line", drawerLabel: "Line width" }}
        />
        <Drawer.Screen
          name="notifications"
          options={{ title: "Notifications", drawerLabel: "Notifications" }}
        />
        <Drawer.Screen
          name="motion"
          options={{ title: "Device motion", drawerLabel: "Device motion" }}
        />
        <Drawer.Screen
          name="coming-soon"
          options={{ title: "Coming soon", drawerLabel: "Coming soon" }}
        />
      </Drawer>
    </>
  );
};
export default SettingsLayout;

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerIcon: {
    fontSize: 22,
    fontWeight: "600",
  },
});
