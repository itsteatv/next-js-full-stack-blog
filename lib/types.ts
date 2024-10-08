export interface BlogPost {
    userId?: string;
    id: string;
    title: string;
    body: string;
    author: string | null | undefined;
    createdAt?: Date;
    updatedAt?: Date;
    categories: { id: string; name: string }[];
}

export interface Category {
    id: string;
    name: string;
}

export interface ButtonProps {
    label?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    usePendingStatus?: boolean;
    pendingContent?: string;
}

export interface InputProps {
    className: string;
    variant?: "standard" | "outlined" | "static";
    placeholder: string;
    id: string;
    type: string;
    defaultValue: string;
    [key: string]: any;
}

export interface TextareaProps {
    className: string;
    id: string;
    rows: number;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Include onChange prop
    [key: string]: any;
}