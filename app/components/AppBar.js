import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

export default function AppBar() {
  const route = useRoute();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const isSearchScreen = route.name === "Search";

  const handleSearch = () => {
    navigation.navigate("Search", { searchText: search });
    setSearch("");
  };

  return (
    <View style={styles.appBar}>
      <View style={styles.leftContainer}>
        {isSearchScreen && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <FontAwesome name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
        )}
        <Text style={styles.appBarText}>Simple Quotes</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#ccc"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome
            name="search"
            size={20}
            color="#ccc"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start
  },
  backButton: {
    marginRight: 10,
  },
  appBarText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    flex: 1, // Take up remaining space
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    alignSelf: "center",
  },
});
