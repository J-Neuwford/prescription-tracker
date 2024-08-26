import { Text, View, StyleSheet } from "react-native";

function PrescriptionCard(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.medicationName}>{props.medicationName}</Text>
      <Text style={styles.dosage}>{props.dosage}</Text>
      <Text style={styles.frequency}>{props.frequency}</Text>
      <Text>{props.isRepeating}</Text>
    </View>
  );
}

export default PrescriptionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 360,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 4,
    elevation: 2,
    paddingTop: 10,
    paddingLeft: 10,
  },
  medicationName: {
    color: "#212529",
    fontSize: 32,
    fontWeight: "bold",
  },
  dosage: {
    color: "#212529",
    fontSize: 16,
  },
  frequency: {
    color: "#212529",
    fontSize: 16,
  },
});
