import { Button, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Usertype } from "../UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const Homescreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(Usertype.userId);
  const [alluser, setAlluser] = useState([]);
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
            onPress={() => navigation.navigate("AddChat")}
          />
          <MaterialIcons
            name="people"
            size={24}
            color="black"
            onPress={() => navigation.navigate("AddChat")}
          />
        </View>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const fetchalluser = async () => {
      console.log("fetching all user");
      const token = await AsyncStorage.getItem("token");

      const decodedtoken = jwt_decode(token);
      const userid = decodedtoken._id;

      setUserId(userid);

      axios
        .get(`https://backend-messenger.onrender.com/user/${userId}`)
        .then((res) => {
          setAlluser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchalluser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
