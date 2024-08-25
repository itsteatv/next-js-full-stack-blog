import { color } from "@material-tailwind/react/types/components/alert";
import { size } from "@material-tailwind/react/types/components/input";

export interface BlogPost {
    userId?: number;
    id: string;
    title: string;
    body: string;
    author: string | null | undefined;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ButtonProps {
    className?: string;
    variant?: "filled" | "outlined" | "gradient" | "text";
    size?: "sm" | "md" | "lg";
    ripple?: boolean;
    content: React.ReactNode;
    color?: color;
    type: "button" | "reset" | "submit";
    disabled?: boolean;
    onClick?: () => void;
    usePendingStatus?: boolean;
    pendingContent?: string;
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
    size?: size | undefined;
    id: string;
    rows: number;
    [key: string]: any;
}