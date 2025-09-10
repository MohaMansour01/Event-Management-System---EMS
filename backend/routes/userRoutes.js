import express from "express";

import {
  getUsers,
  getSingleUsers,
  insertUsers,
  deleteUsers,
  updateUsers,
} from "../controllers/userController.js";

const router = express.Router({ strict: false });

router.post("/", insertUsers);
router.get("/", getUsers);
router.get("/:id", getSingleUsers);
router.delete("/:id", deleteUsers);
router.put("/:id", updateUsers);

export default router;