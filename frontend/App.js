import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrescriptionsScreen from "./screens/PrescriptionsScreen.js";
import HomeScreen from "./screens/HomeScreen.js";

export default function App() {
  const [screen, setScreen] = useState(
    <HomeScreen onPress={handleNavigateToPrescriptionsScreen} />
  );
  function handleNavigateToPrescriptionsScreen() {
    setScreen(<PrescriptionsScreen onPress={handleNavigateToHomeScreen} />);
  }

  function handleNavigateToHomeScreen() {
    setScreen(<HomeScreen onPress={handleNavigateToPrescriptionsScreen} />);
  }
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={["#212529", "#343a40"]} style={styles.rootScreen}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
