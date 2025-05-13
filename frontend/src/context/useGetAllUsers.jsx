import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
export default function useGetAllUsers() {
  const [allusers, setallusers] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getusers = async () => {
      setloading(true);
      try {
        const token = cookies.get("jwt");
        const response = await axios.get
        (
          "/api/user/allusers",
          {
            Credentials: "includes",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setallusers(response.data);
      } catch (err) {
        console.log(err);
      }
      finally{
        setloading(false);
      }
    };
    getusers();
  }, []);
  return {allusers,loading};
}
