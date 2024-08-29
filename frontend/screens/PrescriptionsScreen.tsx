import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { fetchPrescriptions, deletePrescription } from "../api/api";

import PrescriptionCard from "../components/PrescriptionCard";
import { Prescription, PrescriptionsResponse } from "../types/types";

type PrescriptionsScreenProps = {
  onNavigateHome: () => void;
  onNavigateToAddScreen: () => void;
  onNavigateToEditScreen: (prescription: Prescription) => void;
};

function PrescriptionsScreen({
  onNavigateHome,
  onNavigateToAddScreen,
  onNavigateToEditScreen,
}: PrescriptionsScreenProps) {
  const [prescriptions, setPrescriptions] = useState<PrescriptionsResponse>();
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<
    number | null
  >(null);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const data = await fetchPrescriptions();
      setPrescriptions(data);
    } catch (error) {
      console.log("Error loading prescriptions", error);
    }
  };

  function handleSelectPrescription(id: number) {
    setSelectedPrescriptionId(id === selectedPrescriptionId ? null : id);
  }

  const handleDeletePrescription = async () => {
    try {
      if (selectedPrescriptionId) {
        await deletePrescription(selectedPrescriptionId);
        setSelectedPrescriptionId(null);
        loadPrescriptions(); // TODO filter existing list instead
        Alert.alert(
          "Prescription Deleted!",
          "You successfully deleted this prescription.",
          [{ text: "OK", style: "default" }]
        );
      }
    } catch (error) {
      console.log("Failed to delete prescription", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>PRESCRIPTIONS</Text>
        <FlatList
          data={prescriptions ? prescriptions.prescriptions : null}
          renderItem={(itemData) => {
            const isSelected = selectedPrescriptionId === itemData.item.id;
            return (
              <PrescriptionCard
                medicationName={itemData.item.medication_name}
                dosage={itemData.item.dosage}
                frequency={itemData.item.frequency}
                isSelected={isSelected}
                onPress={() => handleSelectPrescription(itemData.item.id)}
              />
            );
          }}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
        {selectedPrescriptionId && (
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="Delete"
                color="firebrick"
                onPress={handleDeletePrescription}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Edit"
                color="teal"
                onPress={() => {
                  const prescriptionToEdit = prescriptions
                    ? prescriptions.prescriptions.find(
                        (p) => p.id === selectedPrescriptionId
                      )
                    : null;
                  if (prescriptionToEdit) {
                    onNavigateToEditScreen(prescriptionToEdit);
                  }
                }}
              />
            </View>
          </View>
        )}

        {!selectedPrescriptionId && (
          <View style={styles.buttonsContainer}>
            <View>
              <Button
                color="teal"
                title="Add prescription"
                onPress={onNavigateToAddScreen}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.homeButton}>
        <Button color="teal" title="Home" onPress={onNavigateHome} />
      </View>
    </>
  );
}

export default PrescriptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "left",
    fontSize: 32,
    marginTop: 40,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 30,
    justifyContent: "flex-start",
  },
  button: {
    marginHorizontal: 32,
  },
  homeButton: { padding: 20 },
});
