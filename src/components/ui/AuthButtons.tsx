"use client"
import { Button } from '@/components/ui/button';
import { JSX } from 'react/jsx-runtime';

interface IButton {
    width:string;
    height:string;
    backgroundColor:string;
    value:JSX.Element | string;
    color:string;
    icon?:JSX.Element;
    type?: "button" | "submit";
}

const AuthButtons = ({value,icon,type}:IButton) => {
  return (
    <div>
      <Button variant='authBtn' type={type} size='authBtn'>{icon}{value}</Button>
    </div>
  ) 
}

export default AuthButtons
