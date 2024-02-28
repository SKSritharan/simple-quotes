import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import Filters from "../components/Filters";
import { getQuotesByTag } from "../services/apiService";
import Quote from "../components/Quote";
import Loader from "../components/Loader";

export default function DiscoverScreen() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes(tag) {
    setIsLoading(true);
    const quotes = await getQuotesByTag(tag);
    setQuotes(quotes);
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Filters onTagSelected={fetchQuotes} />
      {isLoading ? (
        <Loader />
      ) : quotes.results && quotes.results.length > 0 ? (
        <FlatList
          data={quotes.results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Quote quote={item} />}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noResultsText}>
          No quotes found for selected tag.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  flatListContent: {
    paddingBottom: 16,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
