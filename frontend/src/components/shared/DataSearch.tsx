"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";
import { useDebouncedCallback } from "use-debounce";

interface DataSearchProps extends ComponentProps<"input"> {
    pageParamName?: string;
    queryParamName?: string;
}

export function DataSearch({
    pageParamName = "page",
    queryParamName = "query",
    ...props
}: DataSearchProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(pageParamName, "1");

        if (term) {
            params.set(queryParamName, term);
        } else {
            params.delete(queryParamName);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex items-center gap-2 w-full">
            <SearchIcon className="w-4 h-4 absolute left-2" />
            <Input
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get(queryParamName)?.toString()}
                className={cn("pl-8 h-10 w-full", props.className)}
                {...props}
            />
        </div>
    );
}
