import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { updatePrescription } from "../api/api";

function EditPrescriptionScreen({
  onNavigateToPrescriptions,
  existingPrescription,
}) {
  const [updatedPrescription, setUpdatedPrescription] = useState({
    id: existingPrescription.id,
    medication_name: existingPrescription.medication_name, // TODO individual states
    dosage: existingPrescription.dosage,
    frequency: existingPrescription.frequency,
    is_repeating: existingPrescription.is_repeating,
  });

  function medicationNameInputHandler(input) {
    setUpdatedPrescription((prescription) => ({
      ...prescription,
      medication_name: input,
    }));
  }

  function dosageInputHandler(input) {
    setUpdatedPrescription((prescription) => ({
      ...prescription,
      dosage: input,
    }));
  }

  function frequencyInputHandler(input) {
    setUpdatedPrescription((prescription) => ({
      ...prescription,
      frequency: input,
    }));
  }

  const onConfirm = async () => {
    try {
      await updatePrescription(existingPrescription.id, updatedPrescription);
      Alert.alert("Success", "Prescription updated successfully");
      onNavigateToPrescriptions();
    } catch (error) {
      Alert.alert("Error", "Failed to update prescription.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>NEW PRESCRIPTION</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Medication Name"
          placeholderTextColor={"gray"}
          onChangeText={medicationNameInputHandler}
          value={updatedPrescription.medication_name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage"
          placeholderTextColor={"gray"}
          onChangeText={dosageInputHandler}
          value={updatedPrescription.dosage}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Frequency"
          placeholderTextColor={"gray"}
          onChangeText={frequencyInputHandler}
          value={updatedPrescription.frequency}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            color="gray"
            title="Cancel"
            onPress={onNavigateToPrescriptions}
          />
        </View>
        <View style={styles.button}>
          <Button color="teal" title="Confirm Changes" onPress={onConfirm} />
        </View>
      </View>
    </>
  );
}

export default EditPrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 3,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    width: "90%",
    fontSize: 24,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    color: "white",
    marginVertical: 24,
  },
});
