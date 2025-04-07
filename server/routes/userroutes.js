import express from "express";
import {register, login, logout, getUserPublicKey} from "..controllers/usercontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:username", getUserPublicKey);

module.exports = router;
