import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const MainMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Interesting surface app</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Go to playground</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Settings</Text>
      </TouchableOpacity>
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
  button: {
    borderRadius: 10,
    backgroundColor: "gray",
  },
});
