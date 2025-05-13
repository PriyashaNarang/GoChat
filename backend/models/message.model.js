import mongoose from "mongoose"
import user from "./user.model.js"
const messageschema=new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:user,
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref:user,
        required: true
    },
    message:{
        type: String,
        required: true,
        maxlength: 1000
    }
},{timestamps: true})
const Message=mongoose.model("Message",messageschema);
export default Message;