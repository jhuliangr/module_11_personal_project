import { StyleSheet, Text, View } from "react-native";

import { Button } from "#shared/components";

export const MainMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Interesting surface app</Text>
      <Button text="Go to playground" />
      <Button text="Settings" />
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
});
