// Prescription type to represent a single prescription object
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

// Props for components

// HomeScreen Props
export type HomeScreenProps = {
  onNavigate: () => void;
};

// PrescriptionCard Props
export type PrescriptionCardProps = {
  medicationName: string;
  dosage: string;
  frequency: string;
  isSelected: boolean;
  onPress: () => void;
};

// PrescriptionsScreen Props
export type PrescriptionsScreenProps = {
  onNavigateHome: () => void;
  onNavigateToAddScreen: () => void;
  onNavigateToEditScreen: (prescription: Prescription) => void;
};

// AddPrescriptionScreen Props
export type AddPrescriptionScreenProps = {
  onCancel: () => void;
  onNavigateToPrescriptions: () => void;
};

// EditPrescriptionScreen Props
export type EditPrescriptionScreenProps = {
  existingPrescription: Prescription;
  onCancel: () => void;
  onNavigateToPrescriptions: () => void;
};

export type FetchPrescriptions = () => Promise<{
  prescriptions: Prescription[];
}>;

export type DeletePrescription = (id: number) => Promise<void>;
