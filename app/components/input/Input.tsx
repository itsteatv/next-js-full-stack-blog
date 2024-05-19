"use client";

import { Input as MTInput } from "@material-tailwind/react";

interface InputProps {
  className: string;
  variant?: "standard" | "outlined" | "static";
  placeholder: string;
  id: string;
  type: string;
}

const Input = ({ id, type, className, variant, placeholder }: InputProps) => {
  return (
    <MTInput
      id={id}
      type={type}
      className={className}
      variant={variant}
      placeholder={placeholder}
    />
  );
};

export default Input;
