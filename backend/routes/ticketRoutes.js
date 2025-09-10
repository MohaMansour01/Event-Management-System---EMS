import express from "express";

import {
  getTickets,
  getSingleTickets,
  insertTickets,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js";

const router = express.Router({ strict: false });

router.post("/", insertTickets);
router.get("/", getTickets);
router.get("/:id", getSingleTickets);
router.delete("/:id", deleteTicket);
router.put("/:id", updateTicket);

export default router;