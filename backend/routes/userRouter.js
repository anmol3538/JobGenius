import express from "express"
import { register, login, logout } from "../controllers/userController.js"
import { isAuth } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login",  login)
router.get("/logout", isAuth, logout)
export default router;
