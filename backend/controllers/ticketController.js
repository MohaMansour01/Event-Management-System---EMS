import { connectDB } from "../config/db.js";

// Get all Tickets
const getTickets = async (req, res) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM tickets");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single Ticket by ID
const getSingleTickets = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM tickets WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Ticket
const deleteTicket = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM tickets WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    req.status(500).json({ error: err.message });
  }
};

// Insert Ticket
const insertTickets = async (req, res) => {
  try {
    const db = await connectDB();
    const { user_id, event_id, qr_code, status, purchased_at } = req.body;

    const [result] = await db.query(
      "INSERT INTO tickets(user_id, event_id, qr_code, status, purchased_at) VALUES (?,?,?,?,?)",
      [user_id, event_id, qr_code, status, purchased_at]
    );

    res.status(201).json({ message: "Ticket inserted", id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Update Ticket
const updateTicket = async (req, res) => {

  try {
    const db = await connectDB();
    const { id } = req.params;

    const fields = [];
    const values = [];

    for (let key in req.body) {
      if (
        [
          "user_id",
          "event_id",
          "qr_code",
          "status",
          "purchased_at"
        ].includes(key)
      ) {
        fields.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No valid fields to update"})
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE tickets SET ${fields.join(", ")} WHERE id = ?`, values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const [rows] = await db.query("SELECT * FROM tickets WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getTickets,
  getSingleTickets,
  insertTickets,
  deleteTicket,
  updateTicket,
};
