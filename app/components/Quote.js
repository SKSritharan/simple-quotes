import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  ToastAndroid,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
// import * as Sharing from "expo-sharing";

export default function Quote({ quote }) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`"${quote.content}" - ${quote.author}`);
    // alert("Quote copied to clipboard!");
    ToastAndroid.show("Quote copied to clipboard!", ToastAndroid.SHORT);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: "Share this awesome quote",
        message: `"${quote.content}" - ${quote.author}`,
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <View>
      <Text style={styles.text}>"{quote.content}"</Text>
      <Text style={styles.text}>- {quote.author}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <MaterialCommunityIcons
            name="clipboard-text"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <MaterialCommunityIcons
            name="share"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  icon: {
    textAlign: "center",
  },
});
