import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function H1(props: ComponentProps<"h1">) {
    return (
        <h1
            {...props}
            className={cn(
                "scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance",
                props.className
            )}
        >
            {props.children}
        </h1>
    );
}
