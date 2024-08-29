import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrescriptionsScreen from "./screens/PrescriptionsScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import AddPrescriptionScreen from "./screens/AddPrescriptionScreen.js";
import EditPrescriptionScreen from "./screens/EditPrescriptionScreen.js";

export default function App() {
  // NAVIGATION PLACEHOLDER
  const screens = {
    homeScreen: <HomeScreen onNavigate={handleNavigateToPrescriptions} />,
    prescriptionsScreen: (
      <PrescriptionsScreen
        onNavigateHome={handleNavigateToHomeScreen}
        onNavigateToAddScreen={handleNavigateToAddPrescription}
        onNavigateToEditScreen={handleNavigateToEditPrescription}
      />
    ),
    AddPrescriptionScreen: (
      <AddPrescriptionScreen
        onCancel={handleNavigateToPrescriptions}
        onNavigateToPrescriptions={handleNavigateToPrescriptions}
      />
    ),
  };

  const [screen, setScreen] = useState(screens.homeScreen);

  function handleNavigateToAddPrescription() {
    setScreen(screens.AddPrescriptionScreen);
  }

  function handleNavigateToPrescriptions() {
    setScreen(screens.prescriptionsScreen);
  } //

  function handleNavigateToHomeScreen() {
    setScreen(screens.homeScreen);
  }

  function handleNavigateToEditPrescription(selectedPrescription) {
    setScreen(
      <EditPrescriptionScreen
        onCancel={handleNavigateToPrescriptions}
        existingPrescription={selectedPrescription}
        onNavigateToPrescriptions={handleNavigateToPrescriptions}
      />
    );
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
