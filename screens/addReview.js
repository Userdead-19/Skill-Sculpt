import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Alert } from "react-native";
import StarRating from "react-native-star-rating";

const AddReviewScreen = ({ navigation }) => {
  const [designation, setDesignation] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // State to store the selected rating
  // State to store the review text

  const handleRatingChange = (value) => {
    console.log(value);
    setRating(value); // Update the rating state when the user selects a rating
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("authtoken");
    const decodedToken = jwt_decode(token);
    const UserID = decodedToken.userId;
    try {
      const newReview = {
        designation: designation,
        placeofwork: placeOfWork,
        review: review,
        rating: rating,
      };
      await axios
        .post("https://backend-messenger.onrender.com/addReview", newReview)
        .then((res) => {
          Alert.alert("Success", "Review added");
          navigation.goBack();
        }); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Designation"
        value={designation}
        onChangeText={(text) => setDesignation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Place of Work"
        value={placeOfWork}
        onChangeText={(text) => setPlaceOfWork(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Review"
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={(text) => setReview(text)}
      />
      <View style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Rating</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        starSize={25}
        rating={rating}
        selectedStar={handleRatingChange}
        fullStarColor="orange"
      />
      <View style={{ marginBottom: 20 }} />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddReviewScreen;
