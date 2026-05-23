import { Link } from "expo-router";

import { StyleSheet, Text, View } from "react-native";

import { Button } from "#shared/components";

export const MainMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interesting surface app</Text>
      <Link href="/playground" asChild>
        <Button text="Go to playground" />
      </Link>
      <Link href="/settings" asChild>
        <Button text="Settings" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
  },
});
