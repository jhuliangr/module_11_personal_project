import { StyleSheet, View } from "react-native";

import Card from "#design/elements/Card";
import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";

import { featureBySlug } from "./features";

type Props = {
  slug: string;
};

export const ComingSoonDetail: React.FC<Props> = ({ slug }) => {
  const feature = featureBySlug(slug);

  if (!feature) {
    return (
      <Card>
        <Typography variant="large">Unknown feature</Typography>
        <Typography variant="normal">
          No feature is registered under {slug}.
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography variant="title">{feature.title}</Typography>
      <Typography variant="muted" style={styles.summary}>
        {feature.summary}
      </Typography>
      <View style={styles.body}>
        <Typography variant="normal">{feature.details}</Typography>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  summary: {
    marginTop: 4,
    marginBottom: spacing.between,
  },
  body: {
    alignSelf: "stretch",
  },
});
