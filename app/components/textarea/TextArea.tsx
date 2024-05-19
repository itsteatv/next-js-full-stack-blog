"use client";

import { Textarea as MTTextarea } from "@material-tailwind/react";

interface TextareaProps {
  className: string;
  variant?: "standard" | "outlined" | "static";
  size?: string | undefined;
  id: string;
  rows: number;
}

const TextArea = ({ rows, id, className, variant, size }: TextareaProps) => {
  return (
    <MTTextarea
      className={className}
      variant={variant}
      size={size}
      id={id}
      rows={rows}
    />
  );
};

export default TextArea;
