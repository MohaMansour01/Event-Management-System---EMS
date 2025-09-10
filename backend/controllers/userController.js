import { connectDB } from "../config/db.js";

const getUsers = async (req, res) => {
  try {
    const db = await connectDB();

    const [results] = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const [results] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const { name, email, password_hash, role, created_at } = req.body;

    const [results] = await db.query(
      "INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?,?,?,?,?)",
      [name, email, password_hash, role, created_at]
    );

    res.status(201).json({ message: "User Inserted", id: results.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const updateUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const fields = [];
    const values = [];

    for (let key in req.body) {
      if (
        ["name", "email", "password_hash", "role", "created_at"].includes(key)
      ) {
        fields.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    values.push(id);

    const [results] = await db.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUsers, getSingleUsers, insertUsers, deleteUsers, updateUsers };
