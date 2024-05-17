"use client";

interface ButtonProps {
  className?: string;
  variant?: "filled" | "outlined" | "gradient" | "text";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  content: string;
  color?: color;
}

import { Button as MaterialButton } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";

const Button = ({
  color,
  content,
  ripple,
  className,
  variant,
  size,
}: ButtonProps) => {
  return (
    <MaterialButton
      className={className}
      ripple={ripple}
      variant={variant}
      size={size}
      color={color}
    >
      {content}
    </MaterialButton>
  );
};

export default Button;
