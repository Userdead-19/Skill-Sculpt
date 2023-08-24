import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import User from "../../components/User";

const Homescreen = () => {
  const navigation = useNavigation();
  const [userid, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const data = {
        userId: userId,
      };

      const response = await axios.post(
        "https://backend-messenger.onrender.com/users",
        data
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error retrieving users:", error);
    }
  };

  const fetchUsersBySearch = async () => {
    try {
      const response = await axios.get(
        "https://backend-messenger.onrender.com/search",
        {
          params: {
            q: search,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error retrieving users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsersBySearch();
  }, [search]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            onPress={fetchUsersBySearch}
          />
          <TextInput
            placeholder="Search"
            style={styles.input}
            onChangeText={setSearch}
            value={search}
          />
        </View>
      ),
    });
  }, [navigation, search]);

  return (
    <View>
      {users.map((item, index) => (
        <User key={index} item={item} userId={userid} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 20,
    width: 250,
  },
});

export default Homescreen;
