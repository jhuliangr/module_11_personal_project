import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "#design/elements/Button";
import TextField from "#design/elements/fields/Text";
import FormGroup from "#design/elements/FormGroup";
import Typography from "#design/elements/Typography";
import { spacing } from "#design/foundations";
import { createNotification } from "#shared/notifications";

const App: React.FC = () => {
  const [testNotificationText, setTestNotificationText] = useState({
    title: "Notification Title",
    body: "Notification body",
  });
  return (
    <View style={styles.container}>
      <Typography variant="normal">Notifications</Typography>
      <Typography variant="hint">
        A sample notification will appear shortly if you press the next button.
      </Typography>
      <FormGroup label="Test notifications" style={styles.testNotification}>
        <TextField
          onChange={(v) =>
            setTestNotificationText((prev) => ({ ...prev, title: v }))
          }
          value={testNotificationText.title}
        />
        <TextField
          onChange={(v) =>
            setTestNotificationText((prev) => ({ ...prev, body: v }))
          }
          value={testNotificationText.body}
          multiline
          numberOfLines={3}
        />
        <Button
          text="Test Notification"
          onPress={() =>
            createNotification({
              title: testNotificationText.title,
              short: "Short",
              body: testNotificationText.body,
            })
          }
        />
      </FormGroup>
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
  testNotification: {
    width: "100%",
    display: "flex",
    gap: 10,
  },
});
