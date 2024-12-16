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
  isLoading = false,
  loadingComponent,
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const showLoading = (usePendingStatus && pending) || isLoading;

  const displayContent = showLoading ? (
    <div className="relative flex items-center space-x-2">
      {loadingComponent}
      <span>{pendingContent}</span>
    </div>
  ) : (
    label
  );

  return (
    <button
      className={className}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {displayContent}
    </button>
  );
};

export default Button;
