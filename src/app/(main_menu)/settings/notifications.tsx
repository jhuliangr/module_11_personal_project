import { StyleSheet, View } from "react-native";

import Button from "#design/elements/Button";
import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";
import { createNotification } from "#shared/notifications";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="normal">Notifications</Typography>
      <Typography variant="hint">
        A sample notification will appear shortly if you press the next button.
      </Typography>
      <Button
        text="Press me :D"
        onPress={async () =>
          await createNotification({
            title: "Interesting Surface",
            short: "Surface",
            body: "I'm the notification you were looking for :D",
          })
        }
      />
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
});
