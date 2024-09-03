"use client";

import { forwardRef } from "react";
import { TextareaProps } from "@/lib/types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows, id, className, name, defaultValue }, ref) => {
    return (
      <textarea
        id={id}
        name={name}
        rows={rows}
        className={className}
        defaultValue={defaultValue}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
