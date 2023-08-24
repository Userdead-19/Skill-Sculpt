import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import axios from "axios";
const UserDetailsScreen = ({ route }) => {
  console.log(route.params);
  const { userID } = route.params;
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      axios
        .get("https://backend-messenger.onrender.com/user/" + userID)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    };

    getUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",

      headerRight: () => (
        <IconButton
          icon="account-edit"
          size={30}
          color="#fff"
          onPress={() => {
            console.log(user);
            navigation.navigate("Editprofile", { userInfo: user });
          }}
        />
      ),
    });
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image style={styles.userImage} source={{ uri: user.image }} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <Text style={styles.userGender}>{user.gender}</Text>
      <Text style={styles.userDob}>{user.dob}</Text>
      <Text style={styles.userInfo}>
        Year of Graduation: {user.yearofgraduate}
      </Text>
      <Text style={styles.userInfo}>Branch: {user.branch}</Text>
      <Text style={styles.userInfo}>College: {user.college}</Text>
      <Text style={styles.userInfo}>
        Field of Interest: {user.fieldofinterest}
      </Text>
      <Text style={styles.userInfo}>Skills: {user.skills}</Text>
      <Text style={styles.userInfo}>Place of Work: {user.placeofwork}</Text>
      <Text style={styles.userInfo}>Designation: {user.designation}</Text>
      <Text style={styles.userAbout}>About: {user.about}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  userGender: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  userDob: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  userInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  userAbout: {
    fontSize: 16,
    color: "#444",
    marginTop: 20,
  },
});

export default UserDetailsScreen;
