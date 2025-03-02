import express from "express";
import Ticket from "../models/Ticket.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Ticket (User)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const newTicket = new Ticket({ user: req.user.id, title, description });

  try {
    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tickets
router.get("/", authMiddleware, async (req, res) => {
  const tickets =
    req.user.role === "admin"
      ? await Ticket.find()
      : await Ticket.find({ user: req.user.id });
  res.json(tickets);
});

// Update Ticket (Admin)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
