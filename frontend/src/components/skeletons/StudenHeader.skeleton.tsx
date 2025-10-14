import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function StudentHeaderSkeleton() {
	return (
		<header className="flex flex-col gap-4 bg-background p-4 rounded-lg shadow-sm">
			<div className="flex items-center gap-4">
				<Skeleton className="w-16 h-16 rounded-full" />
				<div className="flex flex-col w-full gap-2">
					<div className="flex items-center justify-between w-full">
						<Skeleton className="h-7 w-48" />
						<Skeleton className="h-6 w-24 rounded-full" />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-40 rounded-full" />
					</div>
				</div>
			</div>
			<div className="flex items-center md:flex-row flex-col justify-between gap-2 bg-background p-4 rounded-lg">
				{[0, 1, 2].map((groupIndex) => (
					<React.Fragment key={groupIndex}>
						<div className="flex flex-col gap-2 w-full">
							{[0, 1, 2].map((index) => (
								<React.Fragment key={index}>
									<div className="flex items-center justify-between gap-2 text-muted-foreground">
										<div className="flex items-center gap-1">
											<Skeleton className="w-5 h-5 rounded-full" />
											<Skeleton className="h-4 w-24" />
										</div>
										<Skeleton className="h-4 w-32" />
									</div>
									<div className="h-px w-full bg-border" />
								</React.Fragment>
							))}
						</div>
						{groupIndex < 2 && (
							<div className="md:flex hidden self-stretch min-h-full mx-2 w-px bg-primary" />
						)}
					</React.Fragment>
				))}
			</div>
		</header>
	);
}
