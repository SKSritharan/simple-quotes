import React, { useState, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Loader = () => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        fadeInOut();
      });
    };

    fadeInOut();

    return () => opacity.stopAnimation();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <FontAwesome name="quote-left" size={50} color="#ccc" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#eee",
  },
});

export default Loader;
