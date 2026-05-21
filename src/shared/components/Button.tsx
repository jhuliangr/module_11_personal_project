import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
};

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "gray",
  },
});
