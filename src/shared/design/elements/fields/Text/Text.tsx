import { type TextInputProps, StyleSheet, TextInput } from "react-native";

export type TextFieldProps = {
  onChange: (value: string) => void;
  value: string;
} & Omit<TextInputProps, "onChange" | "value" | "onChangeText">;

const TextField: React.FC<TextFieldProps> = ({
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <TextInput
      onChangeText={onChange}
      value={value}
      style={[
        styles.input,
        style,
        props.multiline && {
          minHeight: 80,
        },
      ]}
      {...props}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    lineHeight: 16,
    textAlignVertical: "top",
  },
});
