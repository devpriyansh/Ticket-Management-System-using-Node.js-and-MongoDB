const express = require("express");
const router = express.Router();

const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller.js");

//* Get all tickets
router.get("/tickets", getTickets);

//* Get a single ticket
router.get("/tickets/:id", getTicket);

//* Create a ticket
router.post("/tickets", createTicket);

//* Update a ticket
router.patch("/tickets/:id", updateTicket);

//* Delete a ticket
router.delete("/tickets/:id", deleteTicket);

module.exports = router;
