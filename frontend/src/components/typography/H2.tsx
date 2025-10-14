import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function H2({ children, ...props }: ComponentProps<"h2">) {
    return (
        <h2
            {...props}
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                props.className
            )}
        >
            {children}
        </h2>
    );
}
