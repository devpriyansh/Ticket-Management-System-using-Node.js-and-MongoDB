//* Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/ticket.route.js");

//* Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware
app.use(bodyParser.json());
app.use(cors());

//* Routes

//& Home Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

//& API Routes
app.use("/api", ticketRoutes);

//* Database
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Database Connected");

    //& Server Start if DB Connected

    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
