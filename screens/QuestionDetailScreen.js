// PostDetailScreen.js
import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import axios from "axios";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;
  const navigator = useNavigation();
  const [recipient, setRecipient] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchcommentsdetails = async () => {
      const response = await fetch(
        `https://backend-messenger.onrender.com/user/${post.comments.userID}`
      );
      const data = await response.json();
      console.log(data);
      setComments(data);
    };
    fetchcommentsdetails();
  }, []);

  useEffect(() => {
    const fetchuserdetails = async () => {
      const response = await fetch(
        `https://backend-messenger.onrender.com/user/${post.userID}`
      );
      const data = await response.json();
      console.log(data);
      setRecipient(data);
    };
    fetchuserdetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            resizeMode: "cover",
          }}
          source={{ uri: recipient?.image }}
        />
        <Text style={{ marginLeft: 10, fontSize: 20 }}>{recipient.name}</Text>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.date}>
        Posted on: {new Date(post.date).toLocaleDateString()}
      </Text>

      <Text style={styles.commentsHeading}>Comments</Text>
      <FlatList
        data={post.comments}
        renderItem={({ item }) => (
          <Text style={styles.comment}>{item.comment}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable onPress={() => navigator.navigate("Comments", { post: post })}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Add a comment
        </Text>
      </Pressable>
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
  content: {
    fontSize: 18,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: "#666",
  },
  commentsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default PostDetailScreen;
