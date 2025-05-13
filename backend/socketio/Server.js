import {Server} from "socket.io";
import http from "http";
import express from "express";
const app=express();
const httpserver=http.createServer(app);
const io=new Server(httpserver,{
    cors: {
        origin: "http://localhost:4001",
        methods: ["GET","POST"]
    }
});
// real time messages
export const getreceiverid=(receiverId)=>{
    return users[receiverId];
}
const users={};
io.on("connection",(socket)=>{
    console.log("New Client connected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId)
    {
        users[userId]=socket.id;
        console.log(users);
        io.emit("getonline",Object.keys(users));
    }
    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id);
        delete users[userId];
        io.emit("getonline",Object.keys(users));
    });
});
export {app,io,httpserver};