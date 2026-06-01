import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.resolve(__dirname, "..", "..", "..", "lib", "db", "data");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, "local.db");
const client = createClient({ url: `file:${dbPath}` });

export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes: string | null;
  status: string;
  createdAt: string;
}

export async function createReservation(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
}): Promise<Reservation> {
  const result = await client.execute({
    sql: `INSERT INTO reservations (name, email, phone, date, time, party_size, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    args: [data.name, data.email, data.phone, data.date, data.time, data.partySize, data.notes ?? null],
  });
  return mapRow(result.rows[0]);
}

export async function getReservations(): Promise<Reservation[]> {
  const result = await client.execute(
    "SELECT * FROM reservations ORDER BY created_at DESC"
  );
  return result.rows.map(mapRow);
}

function mapRow(row: any): Reservation {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    date: row.date,
    time: row.time,
    partySize: row.party_size,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function closeDb(): void {
  client.close();
}
