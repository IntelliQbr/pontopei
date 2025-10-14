import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function Loader({ className, ...props }: ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={cn("animate-spin", className)}
            style={{ transformOrigin: "center" }}
            {...props}
        >
            <line
                x1="12"
                y1="4"
                x2="12"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
