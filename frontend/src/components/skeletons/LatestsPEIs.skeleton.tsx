import { Skeleton } from "@/components/ui/skeleton";

export function LatestsPEIsSkeleton() {
	return (
		<div className="bg-background shadow-sm rounded-lg p-4 w-full">
			{/* Título skeleton */}
			<div className="flex items-center gap-3 mb-4">
				<Skeleton className="w-10 h-10 rounded-full" />
				<Skeleton className="h-6 w-32" />
			</div>

			{/* Cards skeleton */}
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="mt-5">
					<div className="relative overflow-hidden rounded-xl border border-b-8 bg-card/50 p-5">
						<div className="flex items-center justify-between gap-5">
							<div className="flex items-center gap-4">
								<Skeleton className="w-10 h-10 rounded-full" />

								<div className="space-y-1">
									<Skeleton className="h-5 w-32" />
									<div className="flex items-center gap-1.5">
										<Skeleton className="w-3.5 h-3.5" />
										<Skeleton className="h-3 w-24" />
									</div>
								</div>
							</div>

							<Skeleton className="h-6 w-16 rounded-full" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
