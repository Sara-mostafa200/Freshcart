import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "./../../context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductDetails() {
  let [product, setproduct] = useState(null);
  let [relatedProducts, setrelatedProducts] = useState([]);
  let [isLoading, setisLoading] = useState(false);
  const [heart, setheart] = useState(false)
    const [heartID, setheartID] = useState(0)
  let {addWishlist ,setwishlistId ,wishlistId ,wishlistcount,setwishlistcount}= useContext(WishlistContext)


  let {AddToCart,count,setcount} = useContext(CartContext)
  let { id, category } = useParams();

  
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: false,
    arrows: false,
  };

  async function NewAddCart(id) {
    let response = await AddToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setcount(count+=1)

    }
  }
  function MyProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);

        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((res) => {});
  }

  function getProgects() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        let relatedProducts = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(relatedProducts);
      })
      .catch((res) => {
        console.log("error");
      });
  }

  useEffect(() => {
    MyProduct(id);
    getProgects();
  }, [id, category]);

  return (
    <>
      <div className="row items-center ">
        <div className="w-full md:w-1/3 p-3">
          <Slider {...settings}>
            {product?.images.map((src, index) => (
              <img key={index} src={src} className="w-full px-5"></img>
            ))}

            {/* <img src={product?.imageCover} className='w-full' alt="" /> */}
          </Slider>
        </div>
        <div className="w-full md:w-2/3 text-start p-3">
          <h3 className="text-center py-2 text-[30px]  font-semibold text-textPink" >{product?.title}</h3>
          <h3 className="text-center py-1 text-[20px] text-navText  "  >{product?.description}</h3>
          <h4 className="p-1 font-semibold text-textPink">{product?.category.name}</h4>
          <div className="rate flex justify-between p-2">
            <span className="  font-semibold" >{product?.price} EGP</span>
            <span className="text-textGray">
              {product?.ratingsAverage}{" "}
              <i className="fas fa-star text-warning"></i>
            </span>
          </div>
          <button
            onClick={() => {
              NewAddCart(product.id);
            }}
            className="btn mt-3"
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* related product */}
      {relatedProducts.length > 0 ? (
        <div className="row ">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/4  w-full md:w-1/2 mb-3 p-3   "
            >
              <div className="product  py-2 px-5 text-center bg-transparent shadow-lg">
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
      ) : (
        <div className="flex items-center justify-center h-screen">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}
