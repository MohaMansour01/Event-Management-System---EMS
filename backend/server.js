import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));