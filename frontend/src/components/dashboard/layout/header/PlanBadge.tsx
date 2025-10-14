"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import {
	planIcons,
	planNames,
	planStatusColors,
	planStatusLabels,
} from "@/data/plans.data";
import { cn } from "@/lib/utils";
import { StarsIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export function PlanBadge(props: ComponentProps<"div">) {
	const { user } = useAuthContext();

	const subscription = user?.profile?.subscription;
	if (!subscription)
		return (
			<div className="flex items-center gap-2 animate-pulse w-full">
				<Button
					asChild
					className="text-primary sm:bg-primary/20 bg-background hover:bg-background/80 sm:hover:bg-primary/30 w-full"
				>
					<Link href="/onboarding/plans">
						<StarsIcon className="w-4 h-4" />
						<span>Contrate um plano</span>
					</Link>
				</Button>
			</div>
		);

	return (
		<div
			{...props}
			className={cn(
				"sm:bg-primary/20 bg-background text-primary p-1 px-2 text-sm rounded-full flex items-center gap-2 justify-center relative",
				props.className
			)}
		>
			{planIcons[subscription.planType]}
			<span>{planNames[subscription.planType]}</span>
			<span
				className={cn(
					"text-xs text-primary p-1 rounded-full",
					planStatusColors[subscription.status]
				)}
			>
				{planStatusLabels[subscription.status]}
			</span>
		</div>
	);
}
