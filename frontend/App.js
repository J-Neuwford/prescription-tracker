import { StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrescriptionsScreen from "./screens/PrescriptionsScreen.js";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={["#212529", "#343a40"]} style={styles.rootScreen}>
        <PrescriptionsScreen />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
