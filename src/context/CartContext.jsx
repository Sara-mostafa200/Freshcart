import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0)
  const [ownerId, setownerId] = useState(0)
  const [count, setcount] = useState(0)
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function AddToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers }
      )
      .then((res) => res)
      .catch((res) => res);
  }

  function getCartProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
       
        
        setcount(res.data.numOfCartItems)
        setcartId(res.data.cartId)         
        setownerId(res.data.data.cartOwner);
        return res
      }
      ).catch((res) => res
      )
  }

  function updateCartProducts(prouductId, count) {
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/cart/${prouductId}`,{count:count} ,{ headers })
      .then((res) => res
      ).catch((res) => res
      )
  }

  function deleteCartProduct(prouductId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prouductId}`,{headers}).then((res)=>res).catch((res)=>res)
  }

  useEffect(()=>{
    getCartProducts()
    
  },[])

  return (
    <CartContext.Provider value={{ AddToCart , getCartProducts , updateCartProducts ,deleteCartProduct,setcount,count,cartId ,ownerId}}>
      {props.children}
    </CartContext.Provider>
  );
}
