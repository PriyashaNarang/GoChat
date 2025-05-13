import {createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client"
const socketContext=createContext();
export const useSocketContext=()=>{
    return useContext(socketContext);
}
export const SocketProvider=({children})=>{
    const [socket,setsocket]=useState(null);
    const [onlineusers,setonlineusers]=useState([]);
    const {authuser}=useAuth();
    useEffect(()=>{
        if(authuser)
        {
            const newsocket=io("http://localhost:5002/",{
            query:{
                userId:authuser.requser.id,
            }});
            setsocket(newsocket);
            newsocket.on("getonline",(users)=>{
                // console.log("Socket connected");
                setonlineusers(users);
            });
            return () => newsocket.close();
        }
        else
        {
            if(socket)
            {
                socket.close();
                setsocket(null);
            }
        }
    },[authuser]);
    return (
        <socketContext.Provider value={{socket, onlineusers}}>
            {children}
        </socketContext.Provider>
    )
}
