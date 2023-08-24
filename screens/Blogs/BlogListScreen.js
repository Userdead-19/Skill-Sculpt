import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { FloatingAction } from "react-native-floating-action";

const BlogListScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-messenger.onrender.com/blogs")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const actions = [
    {
      text: "New Blog",
      // Replace with your icon
      name: "new_blog",
      position: 1,
    },
  ];

  const handleActionPress = (name) => {
    if (name === "new_blog") {
      navigation.navigate("CreateBlog");
    }
  };

  const renderItem = ({ item }) => {
    const limitedContent =
      item.content.length > 100
        ? item.content.substring(0, 100) + "..."
        : item.content;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("BlogDetail", { blogId: item._id })}
      >
        <View style={styles.blogInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.designation}>
            {item.designation} at {item.company}
          </Text>
          <Text style={styles.content}>{limitedContent}</Text>
        </View>
        <Image
          style={styles.userImage}
          source={{ uri: item.userID[0].image }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <FloatingAction actions={actions} onPressItem={handleActionPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  blogInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  designation: {
    color: "gray",
    marginBottom: 5,
  },
  content: {
    color: "gray",
  },
});

export default BlogListScreen;
