import { Skeleton } from "@/components/ui/skeleton";

export function PlanBadgeSkeleton() {
    return (
        <div className="bg-primary/20 text-primary p-1 px-2 text-sm rounded-full flex items-center gap-2 justify-center">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-10 h-4" />
        </div>
    );
}
