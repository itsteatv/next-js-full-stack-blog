"use client";

import { ButtonProps } from "@/lib/types";
import { Button as MaterialButton } from "@material-tailwind/react";

const Button = ({
  color,
  content,
  ripple,
  className,
  variant,
  size,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <MaterialButton
      className={className}
      ripple={ripple}
      variant={variant}
      size={size}
      color={color}
      type={type}
      disabled={disabled}
    >
      {content}
    </MaterialButton>
  );
};

export default Button;
