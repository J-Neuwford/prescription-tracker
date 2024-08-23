from dataclasses import dataclass

from quart import abort, g, Quart
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

@dataclass
class Prescriptions:
  prescriptions: list[Prescription]

@app.get("/prescriptions/")
@validate_response(Prescriptions)
async def get_prescriptions() -> Prescriptions:
  """Get all prescriptions"""
  query = """SELECT id, medication_name, dosage, frequency, is_repeating 
              FROM prescriptions"""
  prescriptions = [
    Prescription(**row)
    async for row in g.connection.iterate(query)
  ]
  return Prescriptions(prescriptions=prescriptions)

@app.put("/prescriptions/<int:id>/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def update_prescription(id: int, data: PrescriptionInput) -> Prescription:
  """Update a prescription"""
  result = await g.connection.fetch_one(
    """UPDATE prescriptions
        SET medication_name = :medication_name,
            dosage = :dosage,
            frequency = :frequency,
            is_repeating = :is_repeating
            WHERE id = :id
            RETURNING id, medication_name, dosage, frequency, is_repeating""",
            {"id": id, 
             "medication_name": data.medication_name, 
             "dosage": data.dosage,
             "frequency": data.frequency,
             "is_repeating": data.is_repeating},
  )
  if result is None:
    abort(404)
  return Prescription(**result)

@app.delete("/prescriptions/<int:id>/")
async def delete_prescription(id:int) -> str:
  """Delete a prescription"""
  await g.connection.execute(
    """DELETE FROM prescriptions WHERE id = :id""",
    {"id": id},
  )
  return ""