/**
 * Repro: a view that unmounts while the finger is down breaks the JS
 * responder on RN 0.88 (enableNativeEventTargetEventDispatching = true).
 *
 * 1. Tap "Remove me". Its onPressIn unmounts it, so the touch end has no
 *    target and never reaches the responder system.
 * 2. Tap "Count": expected "Tap count: 1".
 * 3. Type in the TextInput, then tap "Count": expected "Tap count: 2".
 *
 * @format
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [removed, setRemoved] = useState(false);
  const [count, setCount] = useState(0);

  if (!removed) {
    return (
      <View style={styles.screen}>
        {/* Unmount this Pressable while the finger is still down. */}
        <Pressable style={styles.button} onPressIn={() => setRemoved(true)}>
          <Text style={styles.label}>Remove me</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Tap count: {count}</Text>
      <Pressable style={styles.button} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.label}>Count</Text>
      </Pressable>
      <TextInput
        testID="input"
        placeholder="Type here"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  button: { padding: 16, backgroundColor: '#ddd', borderRadius: 8 },
  label: { fontSize: 20 },
  input: { width: 240, padding: 12, borderWidth: 1, fontSize: 20 },
});
