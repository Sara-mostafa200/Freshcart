import React from 'react'
import style from './RedAlert.module.css'

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function RedAlert({error}) {
  return (
    <Alert color="failure" className='my-2' icon={HiInformationCircle}>
      <span className="font-medium">{error}</span> 
    </Alert>
  )
}
