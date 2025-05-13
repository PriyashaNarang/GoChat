import React, { createContext, useState, useContext } from "react";
import cookies from "js-cookie";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const initialstate = cookies.get("jwt") || localStorage.getItem("messenger");
  const [authuser, setauthuser] = useState(
    initialstate ? JSON.parse(initialstate) : null
  );
  return (
    <Authcontext.Provider value={{authuser, setauthuser}}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => useContext(Authcontext);