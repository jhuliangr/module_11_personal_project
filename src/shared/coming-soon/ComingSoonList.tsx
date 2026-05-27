import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import Typography from "#design/elements/Typography";
import { colors, spacing } from "#design/foundations";

import { features } from "./features";

export const ComingSoonList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="large">Upcoming features</Typography>
      <Typography variant="hint" style={styles.intro}>
        Tap a feature to see what it would do.
      </Typography>
      {features.map((feature) => (
        <Link
          key={feature.slug}
          href={{
            pathname: "/settings/coming-soon/[feature]",
            params: { feature: feature.slug },
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <Typography variant="label">{feature.title}</Typography>
            <Typography variant="hint">{feature.summary}</Typography>
          </Pressable>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.between,
  },
  intro: {
    marginBottom: spacing.between,
  },
  row: {
    paddingVertical: spacing.tight + 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.muted,
    gap: 2,
  },
});
