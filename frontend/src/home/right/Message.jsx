import React from "react";
export default function Message({message}) {
  const authuser=JSON.parse(localStorage.getItem("messenger"));
  const itsme= message.sender === authuser.requser.id;
  // console.log(authuser.requser.id);
  // console.log(message.sender);
  const chatname=itsme?"chat-end":"chat-start";
  const chatcolor=itsme?"bg-blue-400":"bg-green-400";
  const createdAt=new Date(message.createdAt);
  const formattedtime=createdAt.toLocaleTimeString([],{
    hour: "2-digit",
    minute: "2-digit"
  })
  return (
    <>
      <div className="p-4">
        <div className={`chat ${chatname}`}>
          <div className={`chat-bubble text-white ${chatcolor}`}>{message.message}</div>
          <div className="chat-footer">
            {formattedtime}
          </div>
        </div>
      </div>
    </>
  );
}
