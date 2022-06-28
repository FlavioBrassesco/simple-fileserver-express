const path = require("path");
const express = require("express");
const morgan = require("morgan");

// app config
const app = express();

// middleware
app.use(morgan("short"));

const staticPath = path.join(__dirname, "static");

app.use(express.static(staticPath));

app.use((req, res) => {
  res.status(404).end("File not found");
});

// listener
app.listen(3000, () => {
  console.log("Fileserver listening on port 3000");
});
