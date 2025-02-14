import axios from "axios"
import { createContext, useState } from "react"

export let orderContext = createContext()

export default function OrderContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

function orderCheckout(id, url , values){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,{ "shippingAddress":values},{headers}).then((res)=> res).catch((err)=>err)
}

function getUserOrders(ownerId){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}
`).then((res)=> res
).catch((error)=>error
)
}



  return (
   <orderContext.Provider value={{orderCheckout,getUserOrders}}>
    {props.children}
   </orderContext.Provider>
  )
}
