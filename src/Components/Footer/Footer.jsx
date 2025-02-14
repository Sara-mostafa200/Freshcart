import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import cv from "../../assets/Sara-Elhadad.pdf";

export default function Footer() {
  return (
    <div className="  justify-around  bg-mainGreen text-white flex flex-col gap-8  md:flex-row py-9  w-full items-center md:gap-3 ">
      <div>
        <ul className=" flex gap-2 text-black text-xl ">
          <li className=" ">
            {" "}
            <i className="fa-brands fa-instagram    hover:text-pink-800 hover:animate-bounce hover:transition-all hover:duration-300"></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-facebook  hover:text-blue-800 hover:animate-bounce hover:transition-all hover:duration-300 "></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-youtube  hover:text-red-700 hover:animate-bounce hover:transition-all hover:duration-300 "></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-linkedin  hover:text-blue-900 hover:animate-bounce hover:transition-all hover:duration-300 "></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-twitter  hover:text-sky-500 hover:animate-bounce hover:transition-all hover:duration-300"></i>
          </li>
        </ul>
      </div>
      <div className="text-black">
        {/* <span>© 2025 Sara Elhadad. All Rights Reserved.</span> */}
        <p className="">&copy; 2025 Your Store. All rights reserved.</p>
        Powered by{" "}
        <Link to="#" className=" font-semibold hover:text-red-500">
          Sara Elhadad
        </Link>
      </div>
      <div>
        {" "}
        <a href={cv} download="Sara_Haddad_CV.pdf">
          <button className="btn !bg-black !p-2 hover:!bg-transparent !border-[1px] border-black hover:!border-white hover:animate-bounce transition-all duration-300">
            Download CV
          </button>
        </a>
      </div>
    </div>
  );
}
