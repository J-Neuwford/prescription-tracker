from dataclasses import dataclass

from quart import g, Quart
from quart_db import QuartDB
from quart_schema import QuartSchema, validate_request, validate_response

app = Quart(__name__)
QuartDB(app, url="sqlite:///prescription_tracker.db")
QuartSchema(app)

@dataclass
class PrescriptionInput:
  medication_name: str
  dosage: str
  frequency: str
  is_repeating: int

@dataclass
class Prescription(PrescriptionInput):
  id: int

@app.post("/prescriptions/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def createPrescription(data: PrescriptionInput) -> Prescription:
  """Create a new prescription"""
  result = await g.connection.fetch_one(
    """INSERT INTO prescriptions (medication_name, dosage, frequency, is_repeating)
        VALUES(:medication_name, :dosage, :frequency, :is_repeating)
        RETURNING id, medication_name, dosage, frequency, is_repeating""",
        {"medication_name": data.medication_name, 
         "dosage": data.dosage, 
         "frequency": data.frequency, 
         "is_repeating": data.is_repeating},
  )
  return Prescription(**result)