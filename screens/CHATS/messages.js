import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EmojiSelector from "react-native-emoji-selector";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as ImagePicker from "expo-image-picker";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [showEmojiselecetor, setEmojiselector] = useState(false);
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState("");
  const { recipientId } = route.params;
  const [recipient, setRecipient] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedmessage, setSelectedmessage] = useState([]);
  const [granted, setGranted] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const response = await fetch(
        `https://backend-messenger.onrender.com/messages/${userId}/${recipientId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    const tokens = async () => {
      const token = await AsyncStorage.getItem("authtoken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      console.log(userId);
    };
    tokens();
    fetchMessages();
  }, []);

  console.log(messages);
  useEffect(() => {
    const fetchRecipientdata = async () => {
      try {
        console.log(recipientId);
        const response = await fetch(
          `https://backend-messenger.onrender.com/user/${recipientId}`
        );
        const data = await response.json();
        setRecipient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipientdata();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />

          {selectedmessage.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedmessage.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                onPress={() =>
                  navigation.navigate("Userinfo", { user: recipient })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      resizeMode: "cover",
                    }}
                    source={{ uri: recipient?.image }}
                  />

                  <Text
                    style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}
                  >
                    {recipient?.name}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedmessage.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons
              name="delete"
              size={24}
              color="black"
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete the selected messages?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => deleteMessages(selectedmessage),
                    },
                  ]
                );
              }}
            />
          </View>
        ) : null,
    });
  }, [recipient, selectedmessage]);

  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(
        "https://backend-messenger.onrender.com/deleteMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: messageIds }),
        }
      );

      if (response.ok) {
        setSelectedmessage((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };
  const handleemojiPress = () => {
    setEmojiselector(!showEmojiselecetor);
  };

  const handleSend = async (messageType, imageUri) => {
    try {
      console.log("making an api call");
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recipientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
        fetchMessages();
      }
      console.log(formData);
      const response = await fetch(
        "https://backend-messenger.onrender.com/messages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("");
        setSelectedImage("");
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };
  const handleSelected = (message) => {
    const isSelected = selectedmessage.includes(message._id);
    if (isSelected) {
      setSelectedmessage((previousmessages) =>
        previousmessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedmessage((previousmessages) => [
        ...previousmessages,
        message._id,
      ]);
    }
  };
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const imagepicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };

  console.log("messages", selectedmessage);
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedmessage.includes(item._id);

            return (
              <Pressable
                key={index}
                onLongPress={() => handleSelected(item)}
                style={[
                  item.senderId._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                  isSelected && {
                    backgroundColor: "#ebebeb",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    //textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
          if (item.messageType === "image") {
            const baseUrl =
              "/Users/sujananand/Build/messenger-project/api/files/";
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: baseUrl + filename };
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginBottom: showEmojiselecetor ? 0 : 25,
          borderTopWidth: 1,
          borderTopColor: "grey",
        }}
      >
        <Entypo
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color={"black"}
          onPress={() => handleemojiPress()}
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        ></View>
        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text>Send</Text>
        </Pressable>
      </View>
      {showEmojiselecetor && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Messages;

const styles = StyleSheet.create({});
