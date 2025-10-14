"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CleanFiltersButtonProps {
    cleanPath: string;
}

export function CleanFiltersButton({ cleanPath }: CleanFiltersButtonProps) {
    const router = useRouter();

    return (
        <Button className="w-full" onClick={() => router.push(cleanPath)}>
            <TrashIcon className="w-4 h-4" />
            <span>Limpar Filtros</span>
        </Button>
    );
}
