import express from "express";
import {
  getAllEvents,
  getEventByID,
  deleteEventByID,
  updateEventByID,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventByID);
router.delete("/:id", deleteEventByID);
router.put("/:id", updateEventByID);

export default router;
