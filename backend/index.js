//Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/database");

//routes
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

// Default route to check server running
app.get("/", (req, res) => {
  const DEFAULT_MESSAGE = "Connected to backend!";
  res.send(DEFAULT_MESSAGE);
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
