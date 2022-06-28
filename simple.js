const path = require("path");
const fs = require("fs");
const express = require("express");

// app config
const app = express();

// middleware
app.use((req, res, next) => {
  console.log("Request IP: " + req.ip);
  console.log("Request date: " + new Date());
  next();
});

app.use((req, res, next) => {
  const filePath = path.join(__dirname, "static", req.url);

  fs.stat(filePath, (err, info) => {
    if (err) {
      next();
      return;
    }
    if (info.isFile()) {
      res.sendFile(filePath);
      return;
    }
    next();
  });
});

app.use((req, res) => {
  res.status(404).end("File not found");
});

// listener
app.listen(3000, () => {
  console.log("Fileserver listening on port 3000");
});
