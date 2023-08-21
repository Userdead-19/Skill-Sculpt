// NewPostScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Alert } from "react-native";

const NewPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    const token = await AsyncStorage.getItem("authtoken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    if (title.length < 1 || content.length < 1) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const newPost = {
      title: title,
      content: content,
      userID: userId,
    };

    axios
      .post("https://backend-messenger.onrender.com/posts", newPost)
      .then((response) => {
        Alert.alert("Success", "New post created");
        navigation.replace("Questions"); // Navigate back to previous screen
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.input1}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    height: 200,
  },
});

export default NewPostScreen;
