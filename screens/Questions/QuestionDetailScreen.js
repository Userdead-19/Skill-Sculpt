import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();
  const [recipient, setRecipient] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch recipient details
    const fetchRecipientDetails = async () => {
      try {
        const response = await fetch(
          `https://backend-messenger.onrender.com/user/${post.userID}`
        );
        const data = await response.json();
        setRecipient(data);
      } catch (error) {
        console.error("Error fetching recipient details:", error);
      }
    };
    fetchRecipientDetails();
  }, []);

  useEffect(() => {
    // Fetch comments details
    const fetchCommentsDetails = async () => {
      try {
        const response = await fetch(
          `https://backend-messenger.onrender.com/user/${post.comments.userID}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments details:", error);
      }
    };
    fetchCommentsDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      <View style={styles.recipientContainer}>
        <Image
          style={styles.recipientImage}
          source={{ uri: recipient?.image }}
        />
        <Text style={styles.recipientName}>{recipient.name}</Text>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
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
      <Pressable
        style={styles.addCommentButton}
        onPress={() => navigation.navigate("Comments", { post: post })}
      >
        <Text style={styles.addCommentButtonText}>Add a Comment</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Change the color of the title
  },
  postTitle: {
    fontSize: 22, // Customize the title font size
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444", // Change the color of the post title
  },
  postContent: {
    fontSize: 16, // Customize the content font size
    marginBottom: 20,
    color: "#666", // Change the color of the content
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recipientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  recipientName: {
    fontSize: 20,
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
  addCommentButton: {
    marginTop: 20,
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addCommentButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default PostDetailScreen;
