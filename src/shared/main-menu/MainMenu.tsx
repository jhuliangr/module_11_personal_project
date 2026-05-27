import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import Button from "#design/elements/Button";
import Typography from "#design/elements/Typography";
import { colors, spacing } from "#design/foundations";

export const MainMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.title}>
        Interesting surface app
      </Typography>
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
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: spacing.inside,
  },
});
