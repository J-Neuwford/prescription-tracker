import { ReactElement, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrescriptionsScreen from "./screens/PrescriptionsScreen";
import HomeScreen from "./screens/HomeScreen";
import AddPrescriptionScreen from "./screens/AddPrescriptionScreen";
import EditPrescriptionScreen from "./screens/EditPrescriptionScreen";

import { Prescription } from "./types/types.js";

type ScreenKey = "homeScreen" | "prescriptionsScreen" | "addPrescriptionScreen";

export default function App() {
  // NAVIGATION PLACEHOLDER
  const screens: Record<ScreenKey, ReactElement> = {
    homeScreen: <HomeScreen onNavigate={handleNavigateToPrescriptions} />,
    prescriptionsScreen: (
      <PrescriptionsScreen
        onNavigateHome={handleNavigateToHomeScreen}
        onNavigateToAddScreen={handleNavigateToAddPrescription}
        onNavigateToEditScreen={handleNavigateToEditPrescription}
      />
    ),
    addPrescriptionScreen: (
      <AddPrescriptionScreen
        onCancel={handleNavigateToPrescriptions}
        onNavigateToPrescriptions={handleNavigateToPrescriptions}
      />
    ),
  };

  const [screen, setScreen] = useState(screens.homeScreen);

  function handleNavigateToAddPrescription(): void {
    setScreen(screens.addPrescriptionScreen);
  }

  function handleNavigateToPrescriptions(): void {
    setScreen(screens.prescriptionsScreen);
  } //

  function handleNavigateToHomeScreen(): void {
    setScreen(screens.homeScreen);
  }

  function handleNavigateToEditPrescription(
    selectedPrescription: Prescription
  ) {
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
      <StatusBar barStyle="light-content" />
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
