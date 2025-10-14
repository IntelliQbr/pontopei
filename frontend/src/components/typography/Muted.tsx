import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function Muted({ children, ...props }: ComponentProps<"p">) {
    return (
        <p
            {...props}
            className={cn("text-muted-foreground text-sm", props.className)}
        >
            {children}
        </p>
    );
}
