import React, { useEffect, useLayoutEffect, useState } from "react";
import style from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom';

export default function Cart() {
  const [CartItems, setCartItems] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);


  let { getCartProducts, updateCartProducts, deleteCartProduct ,count,setcount } =useContext(CartContext);
  async function CartProducts() {
    let response = await getCartProducts();
    console.log(response.data.data);
    if (response.data.status == "success") {
      setCartItems(response.data.data);
      
    }
  }
  async function UpdateProducts(productId, count) {
    setcurrentId(productId);
    setLoading(true);
    let response = await updateCartProducts(productId, count);
    console.log(response.data.data);
    if (response.data.status == "success") {
      setLoading(false);

      setCartItems(response.data.data);
    }
  }

  async function DeleteProduct(productId) {
    let response = await deleteCartProduct(productId);
    if (response.data.status == "success") {
      setCartItems(response.data.data);
      setcount(count-=1)

    }
  }
  useEffect(() => {
    CartProducts();
  }, []);

  

  return (
<>
    {CartItems?.products.length > 0 ? 
      <>
        <div className="w-full  bg-gray-50 dark:bg-gray-700 py-3 my-3 rounded">
          {" "}
          <h1 className="text-[25px] font-bold  text-gray-500 dark:text-gray-400">
            Total Price :{" "}
            <span className="text-mainGreen">{CartItems?.totalCartPrice}</span>{" "}
            EGP{" "}
          </h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CartItems?.products?.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-20 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 max-w-32 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}{" "}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          UpdateProducts(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div className={product.product.id}>
                        {Loading && currentId == product.product.id ? (
                          <span className="cartloader"></span>
                        ) : (
                          <span
                            className={`font-semibold text-gray-900 dark:text-white`}
                          >
                            {product.count}
                          </span>
                        )}
                      </div>
  
                      <button
                        onClick={() =>
                          UpdateProducts(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price * product.count}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => DeleteProduct(product.product.id)}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div> <Link to="/checkout">  <button className="btn my-3 !py-2 shadow" >Check out</button></Link>
        <Link to="/allorders">  <button className="btn my-1 !py-2 !bg-black block mx-auto shadow" >My orders</button></Link>
        </>: <>
      {" "}
      <h2 className="text-[30px] py-3 font-bold text-navText">
        Your cart is empty
      </h2>
      <span className="text-[18px] py-3  text-mainGreen">
        Check out our products <i className="fa-solid fa-cart-plus"></i>
      </span>
      <Link to="/allorders">  <button className="btn my-3 !py-2 !bg-black lg:w-1/2 block mx-auto shadow" >My orders</button></Link>
    </>}
    </>
  );
}
