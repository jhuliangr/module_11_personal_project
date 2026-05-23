import { StyleSheet, View } from "react-native";

import { Playground } from "./shared/components/Playground";

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Playground />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
