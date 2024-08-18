"use client";

import { ButtonProps } from "@/lib/types";
import { Button as MaterialButton } from "@material-tailwind/react";
import { useFormStatus } from "react-dom";

interface ExtendedButtonProps extends ButtonProps {
  usePendingStatus?: boolean;
}

const Button = ({
  color,
  content,
  ripple,
  className,
  variant,
  size,
  type,
  disabled,
  usePendingStatus = false,
}: ExtendedButtonProps) => {
  const { pending } = useFormStatus();
  const displayContent = usePendingStatus && pending ? "Creating..." : content;

  return (
    <MaterialButton
      className={className}
      ripple={ripple}
      variant={variant}
      size={size}
      color={color}
      type={type}
      disabled={disabled || pending}
    >
      {displayContent}
    </MaterialButton>
  );
};

export default Button;
