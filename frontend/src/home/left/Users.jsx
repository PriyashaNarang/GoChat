import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
export default function Users() {
  const {allusers, loading} = useGetAllUsers();
  // console.log(allusers);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        style={{ maxHeight: "calc(84vh - 6vh)" }}
        className="overflow-y-auto flex-1 py-2"
      >
        {allusers.map((requser, index) => (
          <User key={index} requser={requser} />
        ))}
      </div>
    </div>
  );
}
