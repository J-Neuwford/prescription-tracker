export type Prescription = {
  id: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  is_repeating?: boolean;
};

export type NewPrescription = {
  medication_name: string;
  dosage: string;
  frequency: string;
  is_repeating?: boolean;
};

export type PrescriptionsResponse = {
  prescriptions: Prescription[];
};

export type HomeScreenProps = {
  onNavigate: () => void;
};

export type PrescriptionCardProps = {
  medicationName: string;
  dosage: string;
  frequency: string;
  isSelected: boolean;
  onPress: () => void;
};

export type PrescriptionsScreenProps = {
  onNavigateHome: () => void;
  onNavigateToAddScreen: () => void;
  onNavigateToEditScreen: (prescription: Prescription) => void;
};

export type AddPrescriptionScreenProps = {
  onCancel: () => void;
  onNavigateToPrescriptions: () => void;
};

export type EditPrescriptionScreenProps = {
  existingPrescription: Prescription;
  onCancel: () => void;
  onNavigateToPrescriptions: () => void;
};

export type FetchPrescriptions = () => Promise<{
  prescriptions: Prescription[];
}>;

export type DeletePrescription = (id: number) => Promise<void>;
