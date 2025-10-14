import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="rounded-lg shadow-sm p-6 border border-gray-200 bg-background"
				>
					<div className="flex items-center justify-between">
						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-8 w-16" />
						</div>
						<Skeleton className="h-12 w-12 rounded-lg" />
					</div>
				</div>
			))}
		</div>
	);
}
