import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
export default function App() {
  const { authuser, setauthuser } = useAuth();
  console.log(authuser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="flex h-screen">
                <Logout></Logout>
                <Left></Left>
                <Right></Right>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        ></Route>
        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        ></Route>
      </Routes>
    </>
  );
}
