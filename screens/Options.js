import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

const Options = () => {
  const navigator = useNavigation();
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Button
        title="Chat Session"
        onPress={() => {
          navigator.navigate("Home");
        }}
      />
      <Button
        title="Questions"
        onPress={() => {
          navigator.navigate("Questions");
        }}
      />
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({});
