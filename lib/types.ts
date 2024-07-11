import { color } from "@material-tailwind/react/types/components/alert";

export interface BlogPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface ButtonProps {
    className?: string;
    variant?: "filled" | "outlined" | "gradient" | "text";
    size?: "sm" | "md" | "lg";
    ripple?: boolean;
    content: string;
    color?: color;
    type: "button" | "reset" | "submit";
    disabled?: boolean;
}

export interface InputProps {
    className: string;
    variant?: "standard" | "outlined" | "static";
    placeholder: string;
    id: string;
    type: string;
    [key: string]: any;
}

export interface TextareaProps {
    className: string;
    variant?: "standard" | "outlined" | "static";
    size?: string | undefined;
    id: string;
    rows: number;
    [key: string]: any;
}