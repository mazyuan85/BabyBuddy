const mainController = require("../controllers/mainController");
const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn")

router.get("/mybabies", ensureLoggedIn, mainController.showBabies);
router.post("/mybabies/add", ensureLoggedIn, mainController.addBaby);
router.get("/mybabies/edit/:id", ensureLoggedIn, mainController.showBaby);
router.post("/mybabies/edit/:id", ensureLoggedIn, mainController.editBaby);
router.delete("/mybabies/delete/:id", ensureLoggedIn, mainController.deleteBaby);
router.delete("/diaper/delete/:id", ensureLoggedIn, mainController.deleteDiaperLog);
router.get("/diaper/lastdiaperlog/:id", mainController.lastDiaperLog);
router.get("/diaper/edit/:id", ensureLoggedIn, mainController.getSingleDiaperLog);
router.put("/diaper/edit/:id", ensureLoggedIn, mainController.editSingleDiaperLog);
router.post("/diaper/add", ensureLoggedIn, mainController.addDiaperLog);
router.get("/diaper", ensureLoggedIn, mainController.getDiaperLog);
router.post("/sleep/add", ensureLoggedIn, mainController.addSleepLog);
router.put("/sleep/add", ensureLoggedIn, mainController.endSleepLog);
router.get("/sleep/add/:id", ensureLoggedIn, mainController.fetchSleepStatus);
router.delete("/sleep/delete/:id", ensureLoggedIn, mainController.deleteSleepLog);
router.get("/sleep/lastsleeplog/:id", mainController.lastSleepLog);
router.get("/sleep", ensureLoggedIn, mainController.getSleepLog);
router.get("/", ensureLoggedIn, mainController.index);

module.exports = router;
