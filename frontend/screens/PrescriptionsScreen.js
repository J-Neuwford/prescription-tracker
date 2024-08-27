import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import { fetchPrescriptions, storePrescription } from "../api/api";

import PrescriptionCard from "../components/PrescriptionCard";

const newPrescription = {
  medication_name: "Paracetamol",
  dosage: "1000mg",
  frequency: "Every four hours",
  is_repeating: false,
};

function PrescriptionsScreen({ onPress }) {
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

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

  const handleAddPrescription = async () => {
    setIsLoading(true);
    try {
      await storePrescription(newPrescription);
      await loadPrescriptions();
    } catch (error) {
      console.log("Error adding prescription", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Active Prescriptions</Text>
        <FlatList
          data={prescriptions.prescriptions}
          renderItem={(itemData) => {
            return isLoading ? (
              <PrescriptionCard />
            ) : (
              <PrescriptionCard
                medicationName={itemData.item.medication_name}
                dosage={itemData.item.dosage}
                frequency={itemData.item.frequency}
              />
            );
          }}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
        <View style={styles.addButton}>
          <Button
            color="teal"
            title="Add prescription"
            onPress={handleAddPrescription}
          />
        </View>
      </View>
      <View style={styles.homeButton}>
        <Button color="teal" title="Home" onPress={onPress} />
      </View>
    </>
  );
}

export default PrescriptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    marginBottom: 80,
    // backgroundColor: "red",
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "left",
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 15,
  },
  addButton: {
    marginTop: 20,
    justifyContent: "flex-end",
  },
  homeButton: { padding: 20 },
});
