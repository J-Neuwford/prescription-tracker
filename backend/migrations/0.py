from quart_db import Connection

async def migrate(connection: Connection) -> None:
  await connection.execute(
    """CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    medication_name STRING NOT NULL,
    dosage STRING NOT NULL,
    frequency STRING NOT NULL,
    is_repeating BOOLEAN DEFAULT FALSE
    )"""
  )

async def valid_migration(connection: Connection) -> bool:
  return True