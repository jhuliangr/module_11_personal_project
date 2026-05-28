import { StyleSheet, Switch, View } from "react-native";

import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";
import { useSettings } from "#shared/settings";

const App: React.FC = () => {
  const { motion, setMotion } = useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Typography style={styles.halfWidth}>
          Turn on or off the influence of device motion over the particles.
        </Typography>
        <Switch value={motion} onValueChange={setMotion} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.between,
    gap: spacing.tight,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  halfWidth: {
    width: "70%",
  },
});
