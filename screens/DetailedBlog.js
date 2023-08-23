import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";

const BlogDetailScreen = ({ route }) => {
  const [name, setName] = useState();
  const { blogId } = route.params;
  const [blog, setBlog] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    axios
      .get(`https://backend-messenger.onrender.com/blogs/${blogId}`)
      .then((response) => {
        setBlog(response.data);
        const name = response.data.userID[0].name;
        const image = response.data.userID[0].image;
        setName(name);
        setImage(image);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
      });
  }, [blogId]);

  if (!blog) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.userImage} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.userInfo}>
        Posted by {name}, {blog.designation} at {blog.company}
      </Text>
      <Text style={styles.content}>{blog.content}</Text>
    </ScrollView>
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
  userInfo: {
    color: "gray",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default BlogDetailScreen;
