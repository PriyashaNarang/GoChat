import axios from "axios";
import React, { useState } from "react";
import { GrLogout } from "react-icons/gr";
import Cookies from "js-cookie";
export default function Logout() {
  const [loading, setloading] = useState(false);
  const handlelogout = async () => {
    setloading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setloading(false);
      alert("Logout successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
        <div className="p-1 align-bottom">
          <button>
            <GrLogout
              className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
              onClick={handlelogout}
            />
          </button>
        </div>
      </div>
    </>
  );
}
