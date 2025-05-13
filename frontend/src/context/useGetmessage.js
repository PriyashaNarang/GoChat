import React, { useEffect, useState } from "react";
import useConversation from "../StateManage/useConversation.js";
import axios from "axios";
export default function useGetmessage() {
  const [loading, setloading] = useState(false);
  const { messages, setmessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getmessages = async () => {
      setloading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setmessages(response.data);
          setloading(false);
        } catch (err) {
          console.log(err);
          setloading(false);
        }
      }
    };
    getmessages();
  }, [selectedConversation,setmessages]);
  return {loading,messages};
}