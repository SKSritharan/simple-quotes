import { StyleSheet, Text, View, Pressable } from "react-native";

export default function Button({ children, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
