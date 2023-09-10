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
          Skill Scuplt
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="account-circle"
            onPress={() =>
              navigator.navigate("ExistingUser", { userID: userID })
            }
          ></IconButton>
          <IconButton
            icon="logout"
            onPress={() => {
              AsyncStorage.removeItem("authtoken");
              navigator.navigate("Login");
            }}
          ></IconButton>
        </View>
      ),
    });
  }, [navigator, userID]);

  return (
    <View style={{ alignItems: "center", flex: 4, backgroundColor: "black" }}>
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/premium-vector/seamless-pattern-with-social-media-networking-global-internet-communication-chatting-instant-messaging-symbols-white-background-vector-illustration-line-art-style-wallpaper_198278-7649.jpg?w=740",
        }}
        style={{ width: "100%", height: 170 }}
      >
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <Pressable
            style={{
              backgroundColor: "#7fb9e0",
              width: 80,
              alignItems: "center",
              height: 35,
              borderRadius: 15,
            }}
            onPress={() => navigator.navigate("Home")}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
              Chat
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
      <ImageBackground
        source={{
          uri: "https://t4.ftcdn.net/jpg/05/52/92/03/240_F_552920367_Vuv7xwGzcJ3AX0RoXj6lY9CyX3AKzpq5.jpg",
        }}
        style={{ marginTop: 5, width: "100%", height: 170, borderRadius: 20 }}
      >
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <Pressable
            style={{
              backgroundColor: "#6b2864",
              width: 100,
              alignItems: "center",
              height: 35,
              borderRadius: 15,
            }}
            onPress={() => navigator.navigate("Questions")}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 5,
                color: "#fff",
              }}
            >
              Questions
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
      <Pressable
        style={{ marginTop: 5, width: "100%", height: 170, borderRadius: 20 }}
        onPress={() => navigator.navigate("Blogs")}
      >
        <Image
          source={{
            uri: "https://st2.depositphotos.com/1420973/6409/i/450/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg",
          }}
          style={{ marginTop: 0, width: "100%", height: 170, borderRadius: 20 }}
        ></Image>
      </Pressable>
      <Pressable
        style={{ marginTop: 5, width: "100%", height: 170, borderRadius: 20 }}
        onPress={() => navigator.navigate("Review")}
      >
        <Image
          source={{
            uri: "https://previews.123rf.com/images/dizanna/dizanna1609/dizanna160900032/62148393-review-word-cloud-business-concept-background.jpg",
          }}
          style={{ marginTop: 0, width: "100%", height: 170, borderRadius: 20 }}
        ></Image>
      </Pressable>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({});
