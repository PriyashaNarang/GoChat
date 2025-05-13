import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../StateManage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
export default function Right() {
  const { selectedConversation, setselectedConversation } = useConversation();
  useEffect(() => {
    return ()=>setselectedConversation(null);
  }, [setselectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <Nochat />
        ) : (
          <>
            <Chatuser></Chatuser>
            <div
              style={{ maxHeight: "calc(88vh - 8vh)" }}
              className="overflow-y-auto flex-1"
            >
              <Messages></Messages>
            </div>
            <Type></Type>
          </>
        )}
      </div>
    </div>
  );
}
const Nochat = () => {
  const { authuser } = useAuth();
  console.log(authuser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center font-semibold text-xl">
          <span>Welcome {authuser.requser.fullname}</span>
          <br/>
          No conversation selected.
          <br />
          Select a conversation to view or start chat.
        </h1>
      </div>
      </div>
    </>
  );
};
