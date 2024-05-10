import express from "express";
import { register, login, logout, getUser, getUserCounts } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/getusercounts", getUserCounts);

export default router;
