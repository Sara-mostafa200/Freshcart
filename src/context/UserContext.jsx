import axios from "axios";
import React, { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [UserLogin, setUserLogin] = useState(localStorage.getItem("userToken")? localStorage.getItem("userToken")  :null);


  function ForgetPass(values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values).then((res)=>res).catch((res)=> res)
  }

  function verifyPass(values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
   .then((res)=>  res)
     .catch((res)=> res)
  }
  function resetPass(values){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
   .then((res)=>  res)
     .catch((res)=> res)
  }


  return (
    <UserContext.Provider value={{ UserLogin, setUserLogin ,ForgetPass ,verifyPass ,resetPass }}>
      {props.children}
    </UserContext.Provider>
  );
}
