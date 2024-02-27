import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getRandomQuote } from "../services/apiService";
import RefreshButton from "../components/RefreshButton";
import Loader from "../components/Loader";
import Quote from "../components/Quote";

export default function HomeScreen() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onPressHandler();
  }, []);

  async function onPressHandler() {
    setIsLoading(true);
    try {
      const data = await getRandomQuote();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : <Quote quote={quote} />}
      <RefreshButton onPress={onPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
