import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const [userid, setUserId] = useState("");

const settoken = async () => {
  const token = await AsyncStorage.getItem("authtoken");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  console.log(userId);
  setUserId(userId);
};

module.exports = { settoken, userid };
