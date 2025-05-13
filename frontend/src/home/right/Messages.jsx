import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetmessage from "../../context/useGetmessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMsg from "../../context/useGetSocketMsg.jsx";
export default function Messages() {
  const { loading, messages } = useGetmessage();
  useGetSocketMsg();
  console.log(messages);
  const lastmessageref=useRef();
  useEffect(()=>{
    setTimeout(() => {
      if(lastmessageref.current)
      {
        lastmessageref.current?.scrollIntoView({behaviour:"smooth"});
      }
    },100);
  },[messages]);
  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 10vh)" }}>
      {loading ? (
        <Loading />
      ) : 
        messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastmessageref}>
            <Message message={message} />;
          </div>
        ))
      ):(
        <div>
          <p className="text-center mt-[20%] font-bold">
            Say Hi! to start the conversation
          </p>
        </div>
      )}    
    </div>
  );
}
