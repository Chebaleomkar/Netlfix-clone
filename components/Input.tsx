import React from 'react';
import { Input } from './ui/input';

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  error?:string;
}

const SInput: React.FC<InputProps> = ({ id, onChange, value, label, type , error}) => {
  return (
    <div className="relative">
      <Input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
      text-white
      bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        "
        placeholder=" " 
      />
      <label 
        htmlFor={id} 
        className="
        absolute 
        text-md
      text-white
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      ">{label}</label>
     {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default SInput;