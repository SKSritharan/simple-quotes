import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function AppBar() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");

  const handleSearch = () => {
    navigation.navigate("Search", { searchText: search });
    setSearch("");
  };

  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarText}>Simple Quotes</Text>
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
  appBarText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
