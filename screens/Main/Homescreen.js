import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import UserChat from "../../components/UserChat";
import { MaterialIcons } from "@expo/vector-icons";

const Chats = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Messenger",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Chat")}
          />
          <MaterialIcons
            name="people"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Friends", { userid: userId })}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authtoken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);

        const response = await fetch(
          `https://backend-messenger.onrender.com/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
          console.log(acceptedFriends);
        } else {
          console.log("Error fetching friends:", response.status.message);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default Chats;

const styles = StyleSheet.create({});
