import axios from "axios";
import { BASE_URL } from "@env";
import {
  NewPrescription,
  Prescription,
  PrescriptionsResponse,
} from "../types/types";

export const fetchPrescriptions = async (): Promise<PrescriptionsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/prescriptions`);
    return response.data;
  } catch (error) {
    console.log("Error fetching prescription", error);
    throw error;
  }
};

// TODO use camel case for medication name etc. map here with TS

export const storePrescription = async (newPrescription: NewPrescription) => {
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

export const deletePrescription = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/prescriptions/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting prescription", error);
    throw error;
  }
};

export const updatePrescription = async (
  id: number,
  updatedPrescription: Prescription
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/prescriptions/${id}`,
      updatedPrescription
    );
    return response.data;
  } catch (error) {
    console.log("Error updating prescription", error);
    throw error;
  }
};
