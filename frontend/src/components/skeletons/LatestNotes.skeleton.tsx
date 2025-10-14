import { Skeleton } from "@/components/ui/skeleton";

export function LatestNotesSkeleton() {
	return (
		<div className="bg-background shadow-sm rounded-lg p-4 w-full space-y-4">
			{/* Título skeleton */}
			<div className="flex items-center gap-3">
				<Skeleton className="w-10 h-10 rounded-full" />
				<Skeleton className="h-6 w-40" />
			</div>

			{/* Cards skeleton */}
			<div className="flex flex-col gap-4">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="self-stretch bg-background p-4 rounded-lg shadow-sm flex flex-col gap-2 border border-primary/20"
					>
						{/* Data skeleton */}
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-32" />
						</div>

						{/* Conteúdo skeleton */}
						<div className="max-h-[200px] overflow-y-auto">
							<div className="bg-[#f9fafb] p-6 rounded-lg">
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
									<Skeleton className="h-4 w-5/6" />
								</div>
							</div>
						</div>

						{/* ID skeleton */}
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-16" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
