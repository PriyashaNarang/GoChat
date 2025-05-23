import express from "express"
import {signup,login,logout,allUsers} from "../controller/user.controller.js"
import secureroute from "../Middleware/secureroute.js";
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/allusers", secureroute, allUsers);
export default router;