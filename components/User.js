import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
const User = ({ item }) => {
  const [requestset, setrequestset] = useState(false);

  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  const sendFriendrequest = async (selectedUserId) => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const currentUserId = decodedToken.userId;

      const response = await fetch(
        "https://backend-messenger.onrender.com/friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUserId,
            selectedUserId,
          }),
        }
      );
      if (response.status === 200) {
        setrequestset(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = await AsyncStorage.getItem("authtoken");
        const decodedToken = jwt_decode(token);
        const userid = decodedToken.userId;

        const response = await fetch(
          `https://backend-messenger.onrender.com/friend-requests/sent/${userid}`
        );
        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error showing friend requests", response.status.message);
        }
      } catch (error) {
        console.log("error fetching friend requests", error);
      }
    };
    fetchFriendRequests();
  }, []);

  console.log("friend requests", friendRequests);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = await AsyncStorage.getItem("authtoken");
        const decodedToken = jwt_decode(token);
        const userid = decodedToken.userId;

        const response = await fetch(
          `https://backend-messenger.onrender.com/friends/${userid}`
        );
        const data = await response.json();
        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error showing friends", response.status.message);
        }
      } catch (error) {
        console.log("error fetching friends", error);
      }
    };
    fetchFriends();
  }, []);
  console.log("friends", userFriends);
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>
      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestset ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendrequest(item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
