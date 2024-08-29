from prescription_model import PrescriptionInput, Prescription, Prescriptions

class PrescriptionRepository: 
  def __init__(self, connection):
    self.connection = connection

  async def create(self, data: PrescriptionInput) -> Prescription: 
    result = await self.connection.fetch_one(
      """INSERT INTO prescriptions (medication_name, dosage, frequency, is_repeating)
        VALUES(:medication_name, :dosage, :frequency, :is_repeating)
        RETURNING id, medication_name, dosage, frequency, is_repeating""",
        {"medication_name": data.medication_name, 
         "dosage": data.dosage, 
         "frequency": data.frequency, 
         "is_repeating": data.is_repeating},
    )
    return Prescription(**result)
  
  async def get_all(self) -> Prescriptions:
    query = """SELECT id, medication_name, dosage, frequency, is_repeating 
                FROM prescriptions"""
    prescriptions = [
      Prescription(**row)
      async for row in self.connection.iterate(query)
    ]
    return Prescriptions(prescriptions=prescriptions)
  
  async def update(self, id: int, data: PrescriptionInput) -> Prescription:
      result = await self.connection.fetch_one(
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
      return Prescription(**result) if result else None
  
  async def delete(self, id:int) -> None:
    await self.connection.execute(
      """DELETE FROM prescriptions WHERE id = :id""",
      {"id": id},
    )