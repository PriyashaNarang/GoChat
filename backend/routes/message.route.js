import express from "express"
import { getmessage, sendmessage } from "../controller/message.controller.js";
import secureroute from "../Middleware/secureroute.js";
const router=express.Router();
router.post("/send/:id",secureroute,sendmessage);
router.get("/get/:id",secureroute,getmessage);
export default router;