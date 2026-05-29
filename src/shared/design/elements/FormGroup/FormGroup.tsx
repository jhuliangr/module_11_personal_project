import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import Typography from "#design/elements/Typography";

export type FormGroupProps = {
  label: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  children,
  style: customStyle = styles.value,
}) => {
  return (
    <View style={styles.group}>
      <Typography style={styles.label}>{label}</Typography>
      <View style={customStyle}>{children}</View>
    </View>
  );
};

export default FormGroup;

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
  },
});
