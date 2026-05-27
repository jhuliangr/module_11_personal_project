import {
  type StyleProp,
  type ViewStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { colors, shapes, spacing } from "#design/foundations";

export type ButtonProps = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: shapes.buttonRadius,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.tight + 2,
    marginVertical: 6,
    minWidth: 200,
    alignItems: "center",
  },
  text: {
    color: colors.background,
    fontWeight: "600",
  },
});
