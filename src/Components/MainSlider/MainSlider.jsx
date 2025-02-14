import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-1.jpeg"
import slider2 from "../../assets/images/slider-2.jpg"
import slider3 from "../../assets/images/slider-3.jpg"
import slider4 from "../../assets/images/slider-4.jpg"
import slider5 from "../../assets/images/slider-5.jpg"
import slider6 from "../../assets/images/slider-6.jpg"
import slider7 from "../../assets/images/slider-7.jpg"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    autoplaySpeed:4000,
    focusOnSelect:true,
    arrows:false
   
  };
  return (
    <Slider {...settings} className='w-[100%] m-auto bg-black rounded-lg mb-14  flex items-center justify-center' >
      <div className='bg-[url("./assets/images/slider-1.jpeg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-2.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-3.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-4.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-5.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-6.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      <div className='bg-[url("./assets/images/slider-7.jpg")] bg-no-repeat bg-center bg-cover rounded-lg w-[] h-[400px]'>
      
    </div>
      </Slider>
    
  )
}
