import React, { useContext, useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { orderContext } from "../../context/orderContext";
import { CartContext } from "../../context/CartContext";
import { Card } from "flowbite-react";

export default function AllOrders() {
  let { getUserOrders } = useContext(orderContext);
  let { ownerId } = useContext(CartContext);
  let [shipinginfo, setshipinginfo] = useState(null);
  console.log(ownerId);

  async function userOrders(ownerId) {
    let response = await getUserOrders(ownerId);
    console.log(response.data);
    setshipinginfo(response.data);
  }

  useEffect(() => {
    userOrders(ownerId);
  }, [ownerId]);

  return (
    <div className="flex gap-y-5 flex-col md:flex-row  items-start justify-between">
      <Card className=" w-[100%] md:w-[60%] ">
        {shipinginfo?.length >= 0 ? (
          <>
            <>
              <h5 className="text-xl font-bold leading-none text-textGray dark:text-white">
                Orders
              </h5>

              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 h-full overflow-auto">
                  {shipinginfo?.map((cart) =>
                    cart?.cartItems?.map((item) => (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="shrink-0">
                            <img
                              alt="Neil image"
                              height="32"
                              src={item.product.imageCover}
                              width="32"
                              className="rounded-full"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className=" inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              Product name
                            </p>
                            <p className=" text-sm font-medium text-gray-900 dark:text-white">
                              {item.product.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </p>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className=" inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              Price
                            </p>
                            <p className=" text-sm font-medium text-gray-900 dark:text-white">
                              {item.price}$
                            </p>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className=" inline-flex items-center text-base font-semibold text-rederror dark:text-white">
                              Total price
                            </p>
                            <p className=" text-sm font-medium text-gray-900 dark:text-white">
                              {item.price * item.count}$
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          </>
        ) : (
          <h5 className="text-xl font-bold leading-none text-rederror dark:text-white">
            No orders
          </h5>
        )}
      </Card>
      <div className="w-[100%] md:w-[30%] flex flex-col gap-5">
        {shipinginfo?.map((cart) => (
          <Card className="max-w-sm ">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              shipping information
            </h5>
            <div className=" text-textPink dark:text-white">
              <span className="text-5xl font-extrabold tracking-tight">
                {cart.totalOrderPrice}
              </span>
              <span className="text-3xl font-semibold">$</span>
            </div>
            <ul className="my-7 space-y-5 flex flex-col items-start">
              <li className="flex items-center gap-3 justify-around w-full">
                <div className="flex flex-col gap-3">
                  {" "}
                  <span className="text-base font-semibold  text-gray-900 dark:text-gray-400">
                    Paid
                  </span>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    {cart.isPaid?<i className="text-mainGreen fa-regular fa-circle-check"></i> :<i className="text-rederror fa-regular fa-circle-xmark"></i>} 
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {" "}
                  <span className="text-base font-semibold  text-gray-900 dark:text-gray-400">
                    Delivered
                  </span>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  {cart.isDelivered?<i className="text-mainGreen fa-regular fa-circle-check"></i> :<i className="text-rederror fa-regular fa-circle-xmark"></i>} 
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base font-semibold  text-gray-900 dark:text-gray-400">
                  city:
                </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  {cart.shippingAddress.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base font-semibold  text-gray-900 dark:text-gray-400">
                  details:
                </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  {cart.shippingAddress.details}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base font-semibold  text-gray-900 dark:text-gray-400">
                  phone:
                </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  {cart.shippingAddress.phone}
                </span>
              </li>
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
