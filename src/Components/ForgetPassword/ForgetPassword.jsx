import React, { useContext, useState } from "react";
import style from "./ForgetPassword.module.css";
import { useFormik } from "formik";


import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from './../../context/UserContext';




export default function ForgetPassword() {
  let navigate = useNavigate()
 let {ForgetPass}= useContext(UserContext)

 
 
  async function handleForgetPassword(values){
  
    console.log(values);
    
   let response = await ForgetPass(values)    
   if(response.data.statusMsg == "success"){
    navigate("/verifypass") 
     
   }
   
      
   
    }



  let formik = useFormik({
    initialValues: {
    
      email: "",
   
      
    },
   
    onSubmit: handleForgetPassword,
  });
  return (
   
    
    <form  onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-mainGreen  font-normal mb-4 text-[40px]">Enter Email</h2>
     
      
     
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your Email
        </label>
        
      </div>
      
      <div className="text-start">

      <Link to="/login"> <p className=" mt-3 underline text-textGray font-medium text-[15px] ">Did you remember password?</p></Link>
      </div>

      
      <div className=" flex flex-col  items-center justify-around ">
       <button
        type="submit"
        className="text-white mt-6  bg-mainGreen hover:bg-mainGreen focus:ring-4 focus:outline-none focus:ring-mainGreen font-medium rounded-lg text-sm relative w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Submit
        
      </button> 
      <Link to="/register"> <p className=" mt-3 underline text-blue-500 font-medium text-[15px] ">Don't you have an account?</p></Link>
     
      </div>
      
    </form>
  );
}
