import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Loader } from "./Loader";

interface SubmitButtonProps
    extends ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {
    icon: React.ReactNode;
    isLoading?: boolean;
}

export function SubmitButton({
    children,
    icon,
    isLoading,
    ...props
}: SubmitButtonProps) {
    return (
        <Button
            {...props}
            className={cn("w-[80%] h-14", props.className)}
            disabled={isLoading || props.disabled}
            type="submit"
        >
            {isLoading ? <Loader /> : icon}
            <span>{children}</span>
        </Button>
    );
}
