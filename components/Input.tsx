"use client";

import { forwardRef } from "react";
import { Input as MTInput } from "@material-tailwind/react";
import { InputProps } from "@/lib/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, className = "", placeholder, ...props }, ref) => {
    return (
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
