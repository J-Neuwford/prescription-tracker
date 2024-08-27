import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrescriptionsScreen from "./screens/PrescriptionsScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import AddPrescriptionScreen from "./screens/AddPrescriptionScreen.js";

export default function App() {
  // NAVIGATION PLACEHOLDER
  const screens = {
    homeScreen: <HomeScreen onNavigate={handleNavigateToPrescriptionsScreen} />,
    prescriptionsScreen: (
      <PrescriptionsScreen
        onNavigate={handleNavigateToHomeScreen}
        onPressAddPrescription={handleAddPrescription}
      />
    ),
    AddPrescriptionScreen: (
      <AddPrescriptionScreen onNavigate={handleCancelAddPrescription} />
    ),
  };

  const [screen, setScreen] = useState(screens.homeScreen);

  function handleAddPrescription() {
    setScreen(screens.AddPrescriptionScreen);
  }

  function handleCancelAddPrescription() {
    setScreen(screens.prescriptionsScreen);
  }

  function handleNavigateToPrescriptionsScreen() {
    setScreen(screens.prescriptionsScreen);
  }

  function handleNavigateToHomeScreen() {
    setScreen(screens.homeScreen);
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
