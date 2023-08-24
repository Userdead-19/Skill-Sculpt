import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import FriendRequest from "../../components/FriendRequest";

const FriendsScreen = () => {
  const [userId, setUserId] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const response = await axios.get(
        `https://backend-messenger.onrender.com/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));
        setIsLoading(false);
        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  console.log(friendRequests);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    console.log(friendRequests.length);
    if (friendRequests.length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Friend Requests!</Text>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
          {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

          {friendRequests.map((item, index) => (
            <FriendRequest
              key={index}
              item={item}
              friendRequests={friendRequests}
              setFriendRequests={setFriendRequests}
            />
          ))}
        </View>
      );
    }
  }
};
export default FriendsScreen;

const styles = StyleSheet.create({});
