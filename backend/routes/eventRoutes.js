import express from "express";
import {
  getAllEvents,
  getEventByID,
  deleteEventByID,
  updateEventByID,
  insertEvent,
} from "../controllers/eventController.js";

const router = express.Router({ strict: false });

router.post("/", insertEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventByID);
router.delete("/:id", deleteEventByID);
router.put("/:id", updateEventByID);

export default router;
