"use client";

import { forwardRef } from "react";
import { Input as MTInput } from "@material-tailwind/react";

interface InputProps {
  className: string;
  variant?: "standard" | "outlined" | "static";
  placeholder: string;
  id: string;
  type: string;
  [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, className, variant, placeholder, ...rest }, ref) => {
    return (
      <MTInput
        id={id}
        type={type}
        className={className}
        variant={variant}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
