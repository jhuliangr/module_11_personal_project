import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
};

export const Button: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "gray",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 6,
    minWidth: 200,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
