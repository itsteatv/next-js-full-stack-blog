"use client";

import { forwardRef } from "react";
import { Textarea as MTTextarea } from "@material-tailwind/react";
import { TextareaProps } from "@/lib/types";

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows, id, className, variant, size, ...rest }, ref) => {
    return (
      <MTTextarea
        className={className}
        variant={variant}
        size={size}
        id={id}
        rows={rows}
        ref={ref}
        {...rest}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
