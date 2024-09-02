"use client";

import { ButtonProps } from "@/lib/types";
import { useFormStatus } from "react-dom";

const Button = ({
  label,
  className,
  type,
  disabled,
  onClick,
  icon,
  usePendingStatus = false,
  pendingContent = "Processing...",
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const displayContent = usePendingStatus && pending ? pendingContent : label;

  return (
    <button
      className={className}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {icon && icon}
      {displayContent}
    </button>
  );
};

export default Button;
