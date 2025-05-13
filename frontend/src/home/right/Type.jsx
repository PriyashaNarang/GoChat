import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage";
export default function Type() {
  const { loading, sendmessages } = useSendMessage();
  const [message, setmessage] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    await sendmessages(message);
    setmessage("");
  };
  return (
    <form onSubmit={handlesubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Type here"
            className="border-[1px] border-gray-700 rounded-xl flex items-center w-full py-3 px-3 mt-1 grow outline-none bg-slate-900"
          />
        </div>
        <button>
          <IoMdSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}
