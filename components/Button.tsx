"use client";

import { ButtonProps } from "@/lib/types";
import { Button as MaterialButton } from "@material-tailwind/react";
import { useFormStatus } from "react-dom";

const Button = ({
  color,
  content,
  ripple,
  className,
  variant,
  size,
  type,
  disabled,
  onClick,
  usePendingStatus = false,
  pendingContent = "Processing...",
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const displayContent = usePendingStatus && pending ? pendingContent : content;

  return (
    <MaterialButton
      className={className}
      ripple={ripple}
      variant={variant}
      size={size}
      color={color}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {displayContent}
    </MaterialButton>
  );
};

export default Button;
