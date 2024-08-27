import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";

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
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/prescriptions`);
      setPrescriptions(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.log("Error fetching prescriptions", error);
    }
  };

  const storePrescription = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/prescriptions`,
        newPrescription
      );
      console.log(response);
      fetchPrescriptions();
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  function handlePress() {
    storePrescription();
  }

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
          <Button color="teal" title="Add prescription" onPress={handlePress} />
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
