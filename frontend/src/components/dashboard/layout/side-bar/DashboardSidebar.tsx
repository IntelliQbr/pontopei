"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

interface DashboardSidebarProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function DashboardSidebar({
    children,
    isOpen,
    setIsOpen,
}: DashboardSidebarProps) {
    return (
        <aside
            className={cn(
                "hidden md:block w-full bg-primary h-full px-2 py-4 space-y-5 transition-all duration-150",
                isOpen
                    ? "max-w-[250px] fixed sm:relative"
                    : "max-w-[60px] relative "
            )}
        >
            <div className="flex items-center justify-between">
                <h1
                    className={cn(
                        "font-semibold text-background p-1 transition-all duration-150",
                        isOpen
                            ? "opacity-100 w-auto text-2xl"
                            : "opacity-0 w-0 text-[0px] absolute"
                    )}
                >
                    Menu
                </h1>
                <Button
                    className="text-background hover:text-background hover:bg-transparent p-5"
                    variant={"ghost"}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon />
                </Button>
            </div>
            <div className="flex flex-col gap-2">{children}</div>
        </aside>
    );
}
