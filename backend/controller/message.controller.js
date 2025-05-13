import conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getreceiverid, io } from "../socketio/Server.js";
// To send messages
export const sendmessage=async(req,res)=>{
    try{
        const {message}=req.body;
        // receiver id
        const {id:receiverid}=req.params;
        // currently logged in user
        const senderid=req.user._id;
        let conversations=await conversation.findOne({
            participants: {$all: [senderid,receiverid]}
        }); 
        if(!conversations)
        {
            conversations=await conversation.create({
                participants: [senderid,receiverid],
            });
        }
        const newmessage=new Message({
            sender: senderid,
            receiver: receiverid,
            message: message,
        });
        if(newmessage)
        {
            conversations.messages.push(newmessage._id);      
        }
        // To add simultaneously
        await Promise.all([conversations.save(),newmessage.save()]);
        const receiversocketId=getreceiverid(receiverid);
        if(receiversocketId)
        {
            io.to(receiversocketId).emit("newmessage",newmessage);
        }
        return res.status(201).json(newmessage);  
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }
};
// To get sent messages
export const getmessage=async(req,res)=>{
    try
    {
        const {id:chatuser}=req.params;
        const senderid=req.user._id;
        let conversations=await conversation.findOne({
            participants:{$all: [senderid,chatuser] }
        }).populate("messages");
        if(!conversations)
        {
            return res.status(201).json({message: "No conversation found"});
        }
        const messages=conversations.messages;
        return res.status(201).json(messages);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Server error"})
    }
}