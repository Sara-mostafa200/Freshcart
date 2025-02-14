import React, { useContext } from 'react'
import style from './Home.module.css'
// import CounterContext from '../context/CounterContext'
import {CounterContext} from "../../context/CounterContext"
import CurrentProducts from './../CurrentProducts/CurrentProducts';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from './../MainSlider/MainSlider';


export default function Home() {
  let {Counter , random} = useContext(CounterContext)
 
  
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <CurrentProducts/>
    </>
  )
}
