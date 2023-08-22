import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const CreateBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = async () => {
    const token = await AsyncStorage.getItem("authtoken");
    const decodedToken = jwt_decode(token);
    const userID = decodedToken.userId;
    // Perform API call to create new blog
    fetch("https://backend-messenger.onrender.com/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, userID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New blog created:", data);
        navigation.goBack(); // Go back to the blog list screen
      })
      .catch((error) => console.error("Error creating blog:", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateBlogScreen;
