import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Usertype from "../UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import User from "../components/User";

const Homescreen = () => {
  const navigation = useNavigation();
  const [userid, setUserId] = useState("");
  const [users, setusers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Messenger",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons
            name="chat"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Chat")}
          />
          <MaterialIcons
            name="people"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Friends", { userid: userid })}
          />
          <MaterialIcons
            name="logout"
            size={24}
            color="black"
            onPress={() => {
              AsyncStorage.removeItem("authtoken");
              navigation.navigate("Login");
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const data = {
        userId: userId,
      };

      axios
        .post(`https://backend-messenger.onrender.com/users`, data)
        .then((response) => {
          setusers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  return (
    <View>
      {users.map((item, index) => (
        <User key={index} item={item} userId={userid} />
      ))}
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});