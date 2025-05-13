import React from "react";
import useConversation from "../../StateManage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
export default function Chatuser() {
  const { selectedConversation } = useConversation();
  // console.log(selectedConversation);
  const { onlineusers } = useSocketContext();
  const getonlinestatus = (userId) => {
    return onlineusers.includes(userId) ? "Online" : "Offline";
  };
  return (
    <div className="pt-5 pl-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
        <div className={`avatar ${getonlinestatus()=="Online"?"online":"offline"}`}>
          <div className="w-12 rounded-full">
            <img src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.fullname}</h1>
        <span className="text-sm">
          {getonlinestatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}
