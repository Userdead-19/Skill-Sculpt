import { StyleSheet, Text, View } from "react-native";
import Stacknavigator from "./Stacknavigator";
import UserContext from "./UserContext";

export default function App() {
  return (
    <>
      <Stacknavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
