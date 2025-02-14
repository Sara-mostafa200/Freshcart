import axios from "axios";
import { createContext, useEffect, useState } from "react"

export let  WishlistContext = createContext()

export default function WishlistContextProvider(props) {
    const [wishlistId, setwishlistId] = useState([])
    const [wishlistcount, setwishlistcount] = useState(0)
    let headers = {
        token: localStorage.getItem("userToken"),
      };


      function addWishlist(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:`${id}`},{headers}).then((res)=>res).catch((err)=>err)
      }

      function getWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
      .then((res)=>{
        setwishlistId(res.data.data.map((product)=>product.id));
        setwishlistcount(res.data.count);
        
        return res})
      .catch((err)=>err)
      }


      function deleteWishlistItem(id){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then((res)=> res).catch((err)=>err)
      }

      useEffect(()=>{
        getWishlist()
      },[wishlistcount])

    return (
    <WishlistContext.Provider value={{addWishlist, getWishlist ,wishlistId ,setwishlistId , wishlistcount ,setwishlistcount ,deleteWishlistItem}}>
        {props.children}
    </WishlistContext.Provider>
  )
}
