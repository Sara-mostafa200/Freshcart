import style from './Brands.module.css'

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Brands() {
  const [Categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="row ">
      {Categories?.map((item) => (
        <div className="lg:w-1/4  w-full md:w-1/2 mb-3 p-3   ">
          <div className="product  py-2 px-5 text-center bg-transparent shadow-lg">

          <img
                    src={item.image}
                    className="w-full mx-auto h-[200px] object-contain"
                    alt=""
                  />
                  <h4 className="p-1 font-semibold text-textGray">
                    {item.name}
                  </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
