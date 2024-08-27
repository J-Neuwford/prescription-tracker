import { View, Text, Button, StyleSheet } from "react-native";

function HomeScreen({ onPress }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>HOME SCREEN</Text>
      </View>
      <View style={styles.prescriptionsButton}>
        <Button color="teal" title="Prescriptions" onPress={onPress} />
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 24,
  },
  prescriptionsButton: {
    padding: 20,
  },
});
