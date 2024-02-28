import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { searchQuotes } from "../services/apiService";
import Loader from "../components/Loader";
import Quote from "../components/Quote";

export default function SearchScreen({ route }) {
  const searchText = route.params?.searchText || "life happiness";
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    fetchQuotes(searchText);
  }, [searchText]);

  async function fetchQuotes(query) {
    setIsLoading(true);
    try {
      const data = await searchQuotes(query);
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : quotes.results.length === 0 ? (
        <Text style={styles.title}>No results found for "{searchText}"</Text>
      ) : (
        <>
          <Text style={styles.title}>Search results for "{searchText}"</Text>
          <View style={styles.separator} />
          <FlatList
            data={quotes.results || []}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Quote quote={item} />}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#c0c0c0",
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
