import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Options = () => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getUserID = async () => {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const id = decodedToken.userId;
      setUserID(id);
    };
    getUserID();
  }, []);

  console.log(userID);

  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            fontStyle: "normal",
            fontFamily: "Roboto",
          }}
        >
          Skill Scruplt
        </Text>
      ),
      headerRight: () => (
        <IconButton
          icon="account-circle"
          onPress={() => navigator.navigate("ExistingUser", { userID: userID })}
        ></IconButton>
      ),
    });
  }, [navigator, userID]);

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Button
        title="Chat Session"
        onPress={() => {
          navigator.navigate("Home");
        }}
      />
      <Button
        title="Questions"
        onPress={() => {
          navigator.navigate("Questions");
        }}
      />
      <Button
        title="Blogs"
        onPress={() => {
          navigator.navigate("Blogs");
        }}
      />
      <Button
        title="Reviews"
        onPress={() => {
          navigator.navigate("Review");
        }}
      />
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({});
