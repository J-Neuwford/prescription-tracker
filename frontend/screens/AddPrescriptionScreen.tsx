import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { storePrescription } from "../api/api";
import {
  AddPrescriptionScreenProps,
  NewPrescription,
  Prescription,
} from "../types/types";

function AddPrescriptionScreen({
  onNavigateToPrescriptions,
}: AddPrescriptionScreenProps) {
  const [newPrescription, setNewPrescription] = useState<NewPrescription>({
    medication_name: "", // TODO individual states
    dosage: "",
    frequency: "",
    is_repeating: false,
  });

  function medicationNameInputHandler(input: string) {
    setNewPrescription((prescription) => ({
      ...prescription,
      medication_name: input,
    }));
  }

  function dosageInputHandler(input: string) {
    setNewPrescription((prescription) => ({
      ...prescription,
      dosage: input,
    }));
  }

  function frequencyInputHandler(input: string) {
    setNewPrescription((prescription) => ({
      ...prescription,
      frequency: input,
    }));
  }

  const onConfirm = async () => {
    try {
      if (
        newPrescription.medication_name !== "" && // TODO extract the validation
        newPrescription.dosage !== "" &&
        newPrescription.frequency !== ""
      ) {
        await storePrescription(newPrescription);
        onNavigateToPrescriptions();
      } else {
        Alert.alert("Form incomplete", "Please fill in all fields", [
          { text: "OK", style: "default" },
        ]);
      }
    } catch (error) {
      console.log("Error adding prescription", error);
    } finally {
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
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage"
          placeholderTextColor={"gray"}
          onChangeText={dosageInputHandler}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Frequency"
          placeholderTextColor={"gray"}
          onChangeText={frequencyInputHandler}
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
          <Button color="teal" title="Confirm" onPress={onConfirm} />
        </View>
      </View>
    </>
  );
}

export default AddPrescriptionScreen;

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
