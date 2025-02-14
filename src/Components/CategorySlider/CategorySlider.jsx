import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [category, setcategory] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows:false,
    autoplay:true,
    autoplaySpeed:4000,
    focusOnSelect:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      
      setcategory(res.data.data)
    }).catch((res)=>{
      console.log("CategorySlider error");
      
    })
  }

  useEffect(()=>{
    getCategories()
  },[])

  return (
    <div className="slider-container">
    <Slider {...settings} >
     {category.map((product , index)=><div key={index}  className="rounded">
      <img src={product.image} className="w-full  object-cover px-1  md:h-[250px]" alt="" />
      <h3>{product.name}</h3>
     </div>
    )}
      
    </Slider></div>
  );
}
