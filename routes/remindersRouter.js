const express = require("express");
const router = express.Router();
const remindersController = require("../controllers/remindersController");

router.get("/send-reminder", remindersController.sendReminders);


module.exports = router;