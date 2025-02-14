import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishlistContext } from '../../context/WishlistContext'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {
  let {getWishlist , deleteWishlistItem , wishlistcount,setwishlistcount}= useContext(WishlistContext)
    let { AddToCart, count, setcount } = useContext(CartContext);
  
  const [data, setdata] = useState([])
  async function getWishlistProduct() {
    let response = await getWishlist()
    console.log(response)
    setdata(response.data.data)
    
  }
  async function deletWishlistProduct(id) {
    let response = await deleteWishlistItem(id)
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setwishlistcount(wishlistcount-=1 )
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

  useEffect(()=>{
    getWishlistProduct()
  },[wishlistcount])
  return (
    <div>
    <div className="row ">
          {data?.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/4  w-full md:w-1/2 mb-3 p-3   "
            >
              <div className="product  py-2 px-5 text-center bg-transparent shadow-lg">
                {" "}
                <div className="text-end">
                  <i
                    onClick={() => deletWishlistProduct(product.id)}
                    className=" text-[25px] cursor-pointer md:text-[15px] lg:text-[30px] text-mainGreen fa-solid fa-heart"
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
    </div>
  )
}
