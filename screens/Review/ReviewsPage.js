import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { FAB } from "react-native-paper"; // You can use a library like react-native-paper for the FAB component
import axios from "axios";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";

const ReviewsScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedReview, setSelectedReview] = useState(null); // To store the selected review
  const [isModalVisible, setIsModalVisible] = useState(false); // To control the visibility of the modal
  const nav = useNavigation();
  const Anonymous = "<Anonymous>";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "https://backend-messenger.onrender.com/reviews"
      );
      setReviews(response.data);
      setFilteredReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const filtered = reviews.filter(
      (review) =>
        review.designation.includes(searchText) ||
        review.placeofwork.includes(searchText)
    );
    setFilteredReviews(filtered);
  }, [searchText]);

  const handleSearch = () => {
    const filtered = reviews.filter(
      (review) =>
        review.designation.includes(searchText) ||
        review.placeofwork.includes(searchText)
    );
    setFilteredReviews(filtered);
  };

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Designation or Place of Work"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <ScrollView>
        {filteredReviews.map((review) => (
          <TouchableOpacity
            key={review._id}
            style={styles.reviewContainer}
            onPress={() => openModal(review)}
          >
            <Text style={styles.designationText}>
              {review.designation || "No Designation"}
            </Text>
            <Text style={styles.placeOfWorkText}>
              {review.placeofwork || "No Place of Work"}
            </Text>
            <View
              style={{
                backgroundColor: "#8EF4EB",
                borderRadius: 10,
                marginTop: 7.5,
                elevation: 5,
              }}
            >
              <Text style={styles.reviewText}>{review.review}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#CBF594",
                transparent: 0.5,
                width: 70,
                alignItems: "center",
                marginTop: 10,
                height: 35,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text style={styles.ratingText}>Rating: {review.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          nav.navigate("AddReview");
        }}
      />

      {/* Modal for displaying detailed review */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedReview && (
            <ScrollView>
              <Text style={{ color: "grey", fontSize: 17 }}>{Anonymous}</Text>
              <Text style={styles.designationText}>
                {selectedReview.designation || "No Designation"}
              </Text>
              <Text style={styles.placeOfWorkText}>
                {selectedReview.placeofwork || "No Place of Work"}
              </Text>
              <View
                style={{
                  backgroundColor: "#F7E7DB",
                  borderRadius: 14,
                  height: 100,
                  width: 340,
                  alignItems: "center",
                  marginTop: 15,
                  elevation: 5,
                }}
              >
                <Text style={styles.reviewText}>{selectedReview.review}</Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexWrap: "wrap",
                  width: 300,
                  alignContent: "center",
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    fontSize: 17,
                    fontWeight: "600",
                  }}
                >
                  Rating:
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    gap: 5,
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    borderRadius: 10,
                    width: 200,
                    height: 40,
                  }}
                >
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={25}
                    rating={selectedReview.rating}
                    fullStarColor="orange"
                    starStyle={{ marginRight: 7, marginLeft: 7, marginTop: 5 }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  designationText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  placeOfWorkText: {
    color: "gray",
    fontSize: 16,
  },
  reviewText: {
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 7.5,
    fontSize: 16,
    fontWeight: "600",
  },
  ratingText: {
    marginTop: 7.5,
    color: "blue",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FA8C3B",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 50,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReviewsScreen;
