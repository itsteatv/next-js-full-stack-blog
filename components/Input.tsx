"use client";

import { forwardRef } from "react";
import { InputProps } from "@/lib/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, className = "", placeholder, defaultValue, ...props }, ref) => {
    return (
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        ref={ref}
        defaultValue={defaultValue}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
