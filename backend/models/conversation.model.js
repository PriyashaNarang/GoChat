import mongoose from "mongoose"
import Message from "./message.model.js"
import user from "./user.model.js";
const conversationschema=new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: user
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: []
        }
    ]
},{timestamps: true});
const conversation=mongoose.model("conversation",conversationschema);
export default conversation;