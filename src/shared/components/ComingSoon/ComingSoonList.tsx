import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { features } from "./features";

export const ComingSoonList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming features</Text>
      <Text style={styles.intro}>Tap a feature to see what it would do.</Text>
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
            <Text style={styles.rowTitle}>{feature.title}</Text>
            <Text style={styles.rowSummary}>{feature.summary}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  intro: {
    fontSize: 13,
    color: "#662",
    marginBottom: 16,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowSummary: {
    fontSize: 13,
    color: "#662",
    marginTop: 2,
  },
});
