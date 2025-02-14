import React, { useContext, useState } from "react";
import style from "./Checkout.module.css";
import { useFormik } from "formik";
import RedAlert from "../RedAlert/RedAlert";
import { Link, useNavigate } from "react-router-dom";
import { orderContext } from "../../context/orderContext";
import { CartContext } from "../../context/CartContext";




export default function Checkout() {
  let {orderCheckout}= useContext(orderContext)
  let {cartId}=useContext(CartContext)
  let [ApiError,setApiError]= useState("")
  let [Loading,setLoading]=useState(false);
 
 
  let formik = useFormik({
    initialValues: {
    
      details: "",
      phone: "",
      city: "",
      
    },
    
    onSubmit: ()=> handleCheckout(cartId,"http://localhost:5173")
  });

 async function handleCheckout(id , url){
   let res = await orderCheckout(id,url,formik.values)
   if (res.data.status == "success"){
    window.location.href =res.data.session.url
   }
   
    
   
  }


  return (
   
    
    <form  onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-mainGreen  font-normal mb-4 text-[40px]">Checkout</h2>
      {/* {ApiError?<div className="bg-rederror p-2 rounded mb-5"><span className="text-white text-[18px] font-medium">{ApiError}</span></div> : null} */}
      
     
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="details"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your details
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your phone
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="city"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your city
        </label>
      </div>
      
      
      <div className=" flex flex-col  items-center justify-around ">
       <button
        type="submit"
        className="text-white mt-6  bg-mainGreen hover:bg-mainGreen focus:ring-4 focus:outline-none focus:ring-mainGreen font-medium rounded-lg text-sm relative w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Checkout
        {/* {Loading? <div className="flex items-center justify-center" ><span className="loader"></span> </div> :"Submit"} */}
        
      </button>      
      </div>
      
    </form>
  );
}
