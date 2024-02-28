import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";

import { TAGS } from "../data/appData";

export default function Filters({ onTagSelected }) {
  const [selectedTag, setSelectedTag] = useState("");

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.tag, selectedTag === item.value && styles.selectedTag]}
      onPress={() => {
        setSelectedTag(selectedTag === item.value ? "" : item.value);
        onTagSelected(item.value);
      }}
    >
      <Text
        style={[styles.text, selectedTag === item.value && styles.selectedText]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={TAGS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "black",
  },
  selectedTag: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    color: "black",
  },
  selectedText: {
    color: "white",
  },
});
