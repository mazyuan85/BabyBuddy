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
router.get("/diaper/lastdiaperlog/:id", ensureLoggedIn, mainController.lastDiaperLog);
router.get("/diaper/edit/:id", ensureLoggedIn, mainController.getSingleDiaperLog);
router.put("/diaper/edit/:id", ensureLoggedIn, mainController.editSingleDiaperLog);
router.post("/diaper/add", ensureLoggedIn, mainController.addDiaperLog);
router.get("/diaper", ensureLoggedIn, mainController.getDiaperLog);
router.get("/", ensureLoggedIn, mainController.index);

module.exports = router;
