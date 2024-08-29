from prescriptions.prescription_model import Prescription, PrescriptionInput, Prescriptions
from quart import g

class PrescriptionRepository:
    @staticmethod
    async def create_prescription(data: PrescriptionInput) -> Prescription:
        result = await g.connection.fetch_one(
            """INSERT INTO prescriptions (medication_name, dosage, frequency, is_repeating)
            VALUES(:medication_name, :dosage, :frequency, :is_repeating)
            RETURNING id, medication_name, dosage, frequency, is_repeating""",
            {
                "medication_name": data.medication_name,
                "dosage": data.dosage,
                "frequency": data.frequency,
                "is_repeating": data.is_repeating,
            },
        )
        return Prescription(**result)
    
    @staticmethod
    async def get_prescriptions() -> Prescriptions:
        query = """SELECT id, medication_name, dosage, frequency, is_repeating 
                    FROM prescriptions"""
        prescriptions = [
            Prescription(**row)
            async for row in g.connection.iterate(query)
        ]
        return prescriptions
    
    @staticmethod
    async def update_prescription(id: int, data: PrescriptionInput) -> Prescription:
        result = await g.connection.fetch_one(
            """UPDATE prescriptions
                SET medication_name = :medication_name,
                    dosage = :dosage,
                    frequency = :frequency,
                    is_repeating = :is_repeating
                    WHERE id = :id
                    RETURNING id, medication_name, dosage, frequency, is_repeating""",
            {
                "id": id,
                "medication_name": data.medication_name,
                "dosage": data.dosage,
                "frequency": data.frequency,
                "is_repeating": data.is_repeating,
            },
        )
        return result
    
    @staticmethod
    async def delete_prescription(id: int) -> None:
        await g.connection.execute(
            """DELETE FROM prescriptions WHERE id = :id""",
            {"id": id},
        )