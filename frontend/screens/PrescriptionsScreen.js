import { View, Text, StyleSheet, FlatList } from "react-native";

import PrescriptionCard from "../components/PrescriptionCard";

function PrescriptionsScreen() {
  const mockPrescriptionData = [
    {
      dosage: "1000mg",
      frequency: "Every four hours",
      id: "0",
      isRepeating: false,
      medicationName: "Paracetamol",
    },
    {
      dosage: "400mg",
      frequency: "Every four hours",
      id: "1",
      isRepeating: false,
      medicationName: "Ibuprofen",
    },
    {
      dosage: "125mg",
      frequency: "Twice a day",
      id: "2",
      isRepeating: true,
      medicationName: "Lamotrigine",
    },
    {
      dosage: "2mg",
      frequency: "As needed",
      id: "3",
      isRepeating: true,
      medicationName: "Diazepam",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Prescriptions</Text>
      <FlatList
        data={mockPrescriptionData}
        renderItem={(itemData) => {
          return (
            <PrescriptionCard
              medicationName={itemData.item.medicationName}
              dosage={itemData.item.dosage}
              frequency={itemData.item.frequency}
              isRepeating={itemData.item.isRepeating}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
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
});
