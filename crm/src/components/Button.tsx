import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => {};
}
export function Button(props: ButtonProps) {
    const handleClick = () => {

        if (props.onClick)
            props.onClick();
    }

    return (
        <button {...props} onClick={handleClick}>{props.children}</button>
    )
}