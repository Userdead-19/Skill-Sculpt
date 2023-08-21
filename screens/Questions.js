import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get("https://backend-messenger.onrender.com/posts")
      .then((response) => {
        setPosts(response.data);
      });
  }, []);
  console.log(posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() =>
              navigation.navigate("QuestionDetail", { post: item })
            }
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="press me"
        onPress={() => navigation.navigate("NewQuestion")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: "#666",
  },
});

export default PostsScreen;
