import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const CreateNewBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  const handleCreateBlog = async () => {
    const token = await AsyncStorage.getItem("authtoken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    if (!title || !content || !designation || !company) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const newBlog = {
      title: title,
      content: content,
      userID: userId,
      designation: designation,
      company: company,
    };

    axios
      .post("https://backend-messenger.onrender.com/blogs", newBlog)
      .then((response) => {
        Alert.alert("New blog created successfully");
        navigation.goBack(); // Navigate back to previous screen
      })
      .catch((error) => {
        Alert.alert("Error creating blog");
        console.error("Error creating blog:", error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        placeholder="Title"
      />
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
        placeholder="Content"
        multiline
      />
      <TextInput
        value={designation}
        onChangeText={(text) => setDesignation(text)}
        style={styles.input}
        placeholder="Your Designation"
      />
      <TextInput
        value={company}
        onChangeText={(text) => setCompany(text)}
        style={styles.input}
        placeholder="Your Company"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateBlog}>
        <Text style={styles.buttonText}>Create Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default CreateNewBlogScreen;
