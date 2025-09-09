import { connectDB } from "../config/db.js";

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single event by ID
const getEventByID = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event by ID
const deleteEventByID = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event by ID
const updateEventByID = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    // Build dynamic query
    const fields = [];
    const values = [];
    for (let key in req.body) {
      if (
        [
          "name",
          "description",
          "location",
          "date",
          "price",
          "capacity",
          "created_by",
          "created_at",
        ].includes(key)
      ) {
        fields.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE events SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllEvents, getEventByID, deleteEventByID, updateEventByID };
