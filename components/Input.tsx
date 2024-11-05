"use client";

import { forwardRef } from "react";
import { InputProps } from "@/lib/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      className = "",
      placeholder,
      value,
      name,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        ref={ref}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
