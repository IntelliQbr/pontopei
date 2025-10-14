import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
    return (
        <div className="flex items-center gap-2 cursor-pointer border rounded-lg p-2 hover:bg-primary/10 min-w-[200px]">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-20 h-4" />
        </div>
    );
}
