import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../StateManage/useConversation.js';
import sound from '../assets/notification.mp3';
export default function useGetSocketMsg() {
    const {socket}=useSocketContext();
    const {messages,setmessages}=useConversation();
    useEffect(()=>{
        socket.on("newmessage",(newmessage)=>{
            const notification=new Audio(sound);
            notification.play();
            setmessages([...messages, newmessage]);
        });
        return ()=>socket.off("newmessage");
    },[socket,messages,setmessages]);
}