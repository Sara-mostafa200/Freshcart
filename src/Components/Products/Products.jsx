import React, { useContext, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "./../../context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";
export default function Products() {
  let { AddToCart, count, setcount } = useContext(CartContext);
  let {addWishlist ,setwishlistId ,wishlistId ,wishlistcount,setwishlistcount}= useContext(WishlistContext)
  const [heart, setheart] = useState(false)
  const [heartID, setheartID] = useState(0)


  
  async function addProductWishlist(id) {
    let response = await addWishlist(id);
    console.log(response);
    if(response.data.status == "success"){
      toast.success(response.data.message)
      setheart(true)
      setheartID(id)
      setwishlistcount(wishlistcount+=1)
      
    }else{
      toast.error("Failed to add the product to your wishlist")
    }
    
  }

  async function NewAddCart(id) {
    let response = await AddToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setcount((count += 1));
    }
  }

  
  let { isError, error, data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="mloader px-5">Loading</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-textPink text-[30px] ">
          <i class="fa-regular fa-circle-xmark"></i> Please try again later
        </span>
      </div>
    );
  }

 
  return (
    <>
      {
        <div className="row ">
          {data?.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/4  w-full md:w-1/2 mb-3 p-3   "
            >
              <div className="product  py-2 px-5 text-center bg-transparent shadow-lg">
                {" "}
                <div className="text-end">
               <i onClick={() => addProductWishlist(product.id) }
                   
                    className={`${ wishlistId.filter((id)=>id == product.id) == product .id ? "text-mainGreen" : "text-backGray"}  ${heart && heartID== product .id   ? "text-mainGreen" : "text-backGray"} text-[25px] cursor-pointer md:text-[15px] lg:text-[30px]  fa-solid fa-heart `}
                  ></i> 
                  
                  
                </div>
                <Link
                  to={`/productDetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-[100px] mx-auto "
                    alt=""
                  />
                  <h4 className="p-1 font-semibold text-textPink">
                    {product.category.name}
                  </h4>
                  <h3 className="pl-1 text-[18px]">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="rate flex justify-between p-2">
                    <span>{product.price} EGP</span>
                    <span className="text-textGray">
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-warning"></i>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    NewAddCart(product.id);
                  }}
                  className="btn"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
