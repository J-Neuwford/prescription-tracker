import axios from "axios";
import { BASE_URL } from "@env";

export const fetchPrescriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/prescriptions`);
    return response.data;
  } catch (error) {
    console.log("Error fetching prescription", error);
    throw error;
  }
};

export const storePrescription = async (newPrescription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/prescriptions`,
      newPrescription
    );
    return response.data;
  } catch (error) {
    console.log("Error storing prescription", error);
    throw error;
  }
};

export const deletePrescription = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/prescriptions/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting prescription", error);
    throw error;
  }
};
