import React from "react";
import { useState } from "react";
import useConversation from "../StateManage/useConversation.js";
import axios from "axios";
export default function useSendMessage() {
  const [loading, setloading] = useState(false);
  const { messages, setmessages, selectedConversation } = useConversation();
  const sendmessages = async (message) => {
    setloading(true);
    try {
      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      if(messages)
      {
        setmessages([...messages, response.data]);
      }
      else
      {
        setmessages((prevMessages = []) => [...prevMessages, response.data]);
      }
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  return { loading, sendmessages };
}
