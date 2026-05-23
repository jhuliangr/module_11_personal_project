import { StyleSheet, Text, View } from "react-native";

import { featureBySlug } from "./features";

type Props = {
  slug: string;
};

export const ComingSoonDetail: React.FC<Props> = ({ slug }) => {
  const feature = featureBySlug(slug);

  if (!feature) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Unknown feature</Text>
        <Text style={styles.body}>No feature is registered under {slug}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.summary}>{feature.summary}</Text>
      <Text style={styles.body}>{feature.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  summary: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
});
