from prescriptions.prescription_model import Prescription, PrescriptionInput, Prescriptions
from prescriptions.prescription_repository import PrescriptionRepository
from quart import abort, g, Quart
from quart_db import QuartDB
from quart_schema import QuartSchema, validate_request, validate_response
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL_DEV = os.getenv("DATABASE_URL_DEV")

app = Quart(__name__)
QuartDB(app, url=DATABASE_URL)
QuartSchema(app)

@app.post("/prescriptions/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def createPrescription(data: PrescriptionInput) -> Prescription:
  """Create a new prescription"""
  prescription = await PrescriptionRepository.create_prescription(data)
  return prescription

@app.get("/prescriptions/")
@validate_response(Prescriptions)
async def get_prescriptions() -> Prescriptions:
    """Get all prescriptions"""
    prescriptions = await PrescriptionRepository.get_prescriptions()
    return Prescriptions(prescriptions=prescriptions)

@app.put("/prescriptions/<int:id>/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def update_prescription(id: int, data: PrescriptionInput) -> Prescription:
    """Update a prescription"""
    result = await PrescriptionRepository.update_prescription(id, data)
    if result is None:
        abort(404)
    return Prescription(**result)

@app.delete("/prescriptions/<int:id>/")
async def delete_prescription(id: int) -> str:
    """Delete a prescription"""
    await PrescriptionRepository.delete_prescription(id)
    return ""