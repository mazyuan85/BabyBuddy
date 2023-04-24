const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');


const app = express();
const port = process.env.PORT || 3000;

const usersRouter = require("./routes/usersRouter");
const mainRouter = require("./routes/mainRouter")
const remindersRouter = require('./routes/remindersRouter');

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(require('./config/checkToken'));
app.use("/api/users", usersRouter);
app.use("/api/main", mainRouter);
app.use("/api", remindersRouter);

app.get("/api", (req, res) => {
  res.send("Hi!");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});