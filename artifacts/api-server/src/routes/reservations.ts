import { Router } from "express";
import { db, reservationsTable, insertReservationSchema } from "@workspace/db";
import { z } from "zod/v4";

const router = Router();

router.post("/reservations", async (req, res) => {
  const parsed = insertReservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: z.treeifyError(parsed.error) });
    return;
  }

  const [reservation] = await db
    .insert(reservationsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(reservation);
});

router.get("/reservations", async (_req, res) => {
  const reservations = await db
    .select()
    .from(reservationsTable)
    .orderBy(reservationsTable.createdAt);
  res.json(reservations);
});

export default router;
