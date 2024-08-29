from prescription_model import Prescription, PrescriptionInput, Prescriptions
from prescription_repository import PrescriptionRepository

class PrescriptionService:
  def _init_(self, repository: PrescriptionRepository):
    self.repository = repository
  
  async def create_prescription(self, data: PrescriptionInput) -> Prescription:
    return await self.repository.create(data)
  
  async def getPrescriptions(self) -> Prescriptions:
    return await self.repository.get_all()
  
  async def update_prescription(self, id: int, data: PrescriptionInput) -> Prescription:
    prescription = await self.repository.update(id, data)
    if prescription is None:
        raise ValueError("Prescription not found")
    return prescription
    
  async def delete_prescription(self, id: int) -> None:
      await self.repository.delete(id)