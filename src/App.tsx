import { StyleSheet, View } from "react-native";

import { MainMenu } from "./MainMenu";

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <MainMenu />
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
