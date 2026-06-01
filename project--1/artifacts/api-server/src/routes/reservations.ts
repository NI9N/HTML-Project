import { Router } from "express";
import { z } from "zod/v4";
import { createReservation, getReservations } from "../db";

const router = Router();

const reservationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  partySize: z.number().int().positive(),
  notes: z.string().optional(),
});

router.post("/reservations", async (req, res, next) => {
  try {
    const parsed = reservationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      return;
    }
    const reservation = await createReservation(parsed.data);
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

router.get("/reservations", async (_req, res, next) => {
  try {
    const reservations = await getReservations();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
});

export default router;
