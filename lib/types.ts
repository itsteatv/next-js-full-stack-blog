export interface BlogPost {
    userId?: string;
    id: string;
    title: string;
    body: string;
    author: string | null | undefined;
    createdAt?: Date;
    updatedAt?: Date;
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
    value?: string; // Include value prop
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Include onChange prop
    [key: string]: any; // Keep any other additional props
}