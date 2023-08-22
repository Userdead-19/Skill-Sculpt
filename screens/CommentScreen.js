// CommentScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
const CommentScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [comment, setComment] = useState("");

  const handlePostComment = async () => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const newComment = {
        text: comment, // Replace with the actual post ID
        userID: userId, // Replace with the actual user ID
        postID: post._id,
      };

      console.log(newComment);

      axios
        .post(`https://backend-messenger.onrender.com/comments`, newComment)
        .then((response) => {
          Alert.alert("Success", "Comment posted successfully");
          navigation.goBack(); // Navigate back to previous screen
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Comment</Text>
      <TextInput
        placeholder="Type your comment here..."
        value={comment}
        onChangeText={setComment}
        multiline
        style={styles.commentInput}
      />
      <Button title="Post Comment" onPress={handlePostComment} />
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
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentScreen;
