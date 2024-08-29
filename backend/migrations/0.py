from quart_db import Connection

async def migrate(connection: Connection) -> None:

# SQLITE3 ----- (LOCAL DEVELOPMENT)
  # await connection.execute(
  #   """CREATE TABLE prescriptions (
  #   id INTEGER,
  #   medication_name TEXT NOT NULL,
  #   dosage TEXT NOT NULL,
  #   frequency TEXT NOT NULL,
  #   is_repeating INTEGER DEFAULT 0,
  #   PRIMARY KEY (id)
  #   )"""
  # )

# POSTGRESQL ----- (PRODUCTION)
  await connection.execute(
    """CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    is_repeating BOOLEAN DEFAULT FALSE
    )"""
  )

async def valid_migration(connection: Connection) -> bool:
  return True



