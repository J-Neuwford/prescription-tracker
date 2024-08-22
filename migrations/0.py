from quart_db import Connection

async def migrate(connection: Connection) -> None:
  await connection.execute(
    """CREATE TABLE prescriptions (
    id integer PRIMARY KEY,
    medication_name text NOT NULL,
    dosage text NOT NULL,
    frequency text NOT NULL,
    is_repeating integer DEFAULT 0
    )"""
  )

async def valid_migration(connection: Connection) -> bool:
  return True