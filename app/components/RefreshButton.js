import React, { useState, useRef } from "react";
import { Animated, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RefreshButton({ onPress }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    setIsAnimating(true);
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsAnimating(false));
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.button, { transform: [{ rotate: rotateInterpolate }] }]}
      >
        <TouchableOpacity
          onPress={() => {
            startAnimation();
            onPress();
          }}
        >
          <MaterialCommunityIcons name="reload" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 16,
  },
});
