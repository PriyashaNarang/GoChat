import React from "react";
import useConversation from "../../StateManage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

export default function User({requser}) {
  const {selectedConversation,setselectedConversation}=useConversation();
  const isselected=selectedConversation?._id===requser._id;
  const {socket, onlineusers}=useSocketContext();
  const isonline=onlineusers.includes(requser._id);
  return (
    <div className={`hover:bg-slate-600 duration-300 ${isselected ? "bg-slate-700":""}`} onClick={()=>setselectedConversation(requser)}> 
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isonline?"online":"offline"}`}>
          <div className="w-12 rounded-full">
            <img src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{requser.fullname}</h1>
          <span>{requser.email}</span>
        </div>
      </div>
    </div>
  );
}
