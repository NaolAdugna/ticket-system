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
// Get Tickets
router.get("/", authMiddleware, async (req, res) => {
  const tickets =
    req.user.role === "admin"
      ? await Ticket.find() // Admin can see all tickets
      : await Ticket.find({ user: req.user.id }); // Regular user can see only their tickets
  res.json(tickets);
});

// Update Ticket (Admin)
// Update Ticket (Admin)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status field
    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const validStatuses = ["Open", "In Progress", "Closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    // Find and update the ticket's status
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status }, // Only update the status field
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;