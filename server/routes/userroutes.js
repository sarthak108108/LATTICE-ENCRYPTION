import express from "express";
import {register, login, logout, getUserPublicKey} from "..controllers/usercontroller.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/:username", getUserPublicKey);

module.exports = userRoutes;
