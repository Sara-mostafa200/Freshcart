import React from "react";
import style from "./Layout.module.css";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import MyNavbar from "../MyNavbar/MyNavbar";

export default function Layout() {
  return (
    <div className="layout ">
      <MyNavbar />
      
      <div className="container w-[90%] mx-auto my-3 py-10 lg:py-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
