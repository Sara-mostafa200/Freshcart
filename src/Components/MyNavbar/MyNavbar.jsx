import React, { useContext, useEffect, useState } from "react";
import style from "./MyNavbar.module.css";
import { Navbar } from "flowbite-react";

// import logo from "../../assets/images/freshcart-logo.svg";
import logo from "../../assets/images/myfreshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { top } from "./../../../node_modules/@popperjs/core/lib/enums";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function MyNavbar() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let {wishlistcount,setwishlistcount}= useContext(WishlistContext)
  let{count }=useContext(CartContext)
  let [scroll, setscroll] = useState(false);
  let navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    function scrolling() {
      if (window.scrollY > 20) {
        setscroll(true);
        
      } else {
        setscroll(false);
       

      }
    }

    window.addEventListener("scroll", (e) => {
      scrolling();
    });

    return () => {
      window.removeEventListener("scroll", scrolling());
    };
  }, []);

  return (
    <Navbar
      className={` ${
        scroll ? `shadow-xl bg-white   ` : `bg-transparent`
      }    flex py-5  z-50 items-center   fixed top-[-3px] gap-3 right-0 left-0 transition-all duration-[0.7s] `}
    >
      <div className="  items-center !w-full justify-between  contents md:flex md:gap-x-2">
        <div className="flex md:px-5 lg:px-0 gap-2   items-center">
           <Link to="">
          <img
            src={logo}
            className="mr-0 w-[200px] md:w-[200px] lg:w-[200px]"
            alt="cart React Logo"
          />
        </Link>
        {UserLogin ? <><Link to="/cart" className="relative mr-3 ">
        <div className="absolute   lg:text-[15px] text-[13px] md:top-[-10px] md:right-[-10px] text-white lg:top-[-15px] lg:right-[-16px] top-[-15px]  right-[-15px] size-5 md:size-4 lg:size-6 bg-rederror rounded-full flex items-center justify-center">
           {count}
          </div>
        
        <i className="text-[25px] md:text-[15px] lg:text-[30px] text-mainGreen fa-solid fa-cart-plus">
          
          </i>
       
        </Link>
        <Link to="/wishlist" className="relative ">
        <div className="absolute   lg:text-[15px] text-[13px] md:top-[-10px] md:right-[-10px] text-white lg:top-[-15px] lg:right-[-16px] top-[-15px]  right-[-15px] size-5 md:size-4 lg:size-6 bg-rederror rounded-full flex items-center justify-center">
        {wishlistcount}
          </div>
        
        <i className="text-[25px] md:text-[15px] lg:text-[30px] text-mainGreen fa-solid fa-heart">
          
          </i>
       
        </Link>
        
        </> : null  }
        
        </div>
       
        {UserLogin ? (
          <Navbar.Collapse className={`   ${
            scroll ? ` transition-all duration-[1.5s]   ` : `md:bg-transparent bg-white transition-all duration-[1.5s]`
          }   `}>
            <NavLink
              className="text-[18px] p-3 text-navText font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3  transition-all duration-[0.3s]"
              to=""
            >
              Home
            </NavLink>
            <NavLink
              className="text-[18px] p-3 text-navText font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3 transition-all duration-[0.3s]"
              to="cart"
            >
              Cart 
            </NavLink>
            <NavLink
              className="text-[18px] p-3 text-navText font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3 transition-all duration-[0.3s] "
              to="products"
            >
              Products
            </NavLink>
            <NavLink
              className="text-[18px] p-3 text-navText font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3 transition-all duration-[0.3s]"
              to="categories"
            >
              Categories
            </NavLink>
            <NavLink
              className="text-[18px] p-3 text-navText font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3 transition-all duration-[0.3s]"
              to="brands"
            >
              Brands
            </NavLink>
            <ul className="flex flex-col ">
              <li className="text-[18px] p-3 text-rederror cursor-pointer font-[400] md:text-[15px] md:p-2 lg:text-[18px] lg:p-3  transition-all duration-[0.3s]">
                <span onClick={signOut}>Signout</span>
              </li>
            </ul>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="bg-white  ">
            {" "}
            {
              <ul className="flex  flex-col md:flex-row gap-5 py-3">
                <li>
                  <NavLink
                    to="login"
                    className="text-[18px] p-3 text-navText font-[400] transition-all duration-[0.3s]"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className="text-[18px] p-3 text-navText font-[400] transition-all duration-[0.3s]"
                  >
                    register
                  </NavLink>
                </li>
              </ul>
            }{" "}
          </Navbar.Collapse>
        )}
      </div>
      <div className=" flex gap-3 items-center fixed right-0 top-0 p-5 ">
        {/* {UserLogin?   :null} */}
        <Navbar.Toggle className="order-2 " />

        {/* <ul className=" gap-3   order-1 hidden  ">
          <li>
            {" "}
            <i className="fa-brands fa-instagram"></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-facebook"></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-youtube"></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-linkedin"></i>
          </li>
          <li>
            {" "}
            <i className="fa-brands fa-twitter"></i>
          </li>
        </ul> */}

      </div>
    </Navbar>
  );
}
