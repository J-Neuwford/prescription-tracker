from dataclasses import dataclass

@dataclass
class PrescriptionInput:
  medication_name: str
  dosage: str
  frequency: str
  is_repeating: bool

@dataclass
class Prescription(PrescriptionInput):
  id: int


@dataclass
class Prescriptions:
  prescriptions: list[Prescription]


