"use client";

import { forwardRef } from "react";
import { TextareaProps } from "@/lib/types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows, id, className, name, value, onChange, defaultValue }, ref) => {
    return (
      <textarea
        id={id}
        name={name}
        rows={rows}
        className={className}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
