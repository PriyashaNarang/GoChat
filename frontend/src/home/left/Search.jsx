import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../StateManage/useConversation.js";
export default function Search() {
  const [search, setsearch] = useState("");
  const {allusers} = useGetAllUsers();
  const { setselectedConversation } = useConversation();
  // console.log(allusers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allusers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setselectedConversation(conversation);
      setsearch("");
    } else {
      alert("User not found");
    }
  };
  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </label>
            <button>
              <IoMdSearch className="text-4xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
