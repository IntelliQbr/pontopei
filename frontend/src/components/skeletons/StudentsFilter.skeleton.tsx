import { Skeleton } from "@/components/ui/skeleton";

export function StudentsFilterSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
                <Skeleton className="w-4 h-4 bg-background/50" />
                <Skeleton className="w-16 h-4 bg-background/50 " />
            </div>
            <Skeleton className="w-full h-9 border-2 border-border rounded-md" />
        </div>
    );
}
