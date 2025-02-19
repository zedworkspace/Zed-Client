"use client"
import { Button } from '@/components/ui/button';
import { useState } from 'react'

interface IButton {
    width:string;
    height:string;
    backgroundColor:string;
    value:any;
    color:string;
    icon?:any;
    type?: "button" | "submit";
}

const AuthButtons = ({width,height,backgroundColor,value,color,icon,type}:IButton) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      {/* <button 
      className='font-bold ' style={{backgroundColor: isHovered ? color : backgroundColor,color:,width,height,borderRadius:"10px"}} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      >
      {value}</button> */}
      <Button variant='authBtn' type={type} size='authBtn'>{icon}{value}</Button>
    </div>
  ) 
}

export default AuthButtons
