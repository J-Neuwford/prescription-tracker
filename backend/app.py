from quart import abort, g, Quart
from quart_db import QuartDB
from quart_schema import QuartSchema, validate_request, validate_response
from prescriptions.prescription_model import PrescriptionInput, Prescription, Prescriptions
from prescriptions.prescription_repository import PrescriptionRepository
from prescriptions.prescription_service import PrescriptionService
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

app = Quart(__name__)
QuartDB(app, url=DATABASE_URL)
QuartSchema(app)

repository = PrescriptionRepository
service = PrescriptionService

@app.post("/prescriptions/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def createPrescription(data: PrescriptionInput) -> Prescription:
  """Create a new prescription"""
  try:
      prescription = await service.create_prescription(data)
      return prescription
  except Exception as error:
      abort(400, description=str(error))


@app.get("/prescriptions/")
@validate_response(Prescriptions)
async def get_prescriptions() -> Prescriptions:
    """Get all prescriptions"""
    prescriptions = await service.get_prescriptions()
    return Prescriptions(prescriptions=prescriptions)


@app.put("/prescriptions/<int:id>/")
@validate_request(PrescriptionInput)
@validate_response(Prescription)
async def update_prescription(id: int, data: PrescriptionInput) -> Prescription:
    """Update a prescription"""
    try:
        prescription = await service.update_prescription(id, data)
        return prescription
    except ValueError:
        abort(404, description="Prescription not found")


@app.delete("/prescriptions/<int:id>/")
async def delete_prescription(id: int) -> str:
    """Delete a prescription"""
    await service.delete_prescription(id)
    return ""