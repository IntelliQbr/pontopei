import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconWithBackgroundProps {
	icon: LucideIcon;
	className?: string;
	bgClassName?: string;
	iconClassName?: string;
}

export function IconWithBackground({
	icon: Icon,
	className = "",
	bgClassName = "bg-primary/10",
	iconClassName = "text-primary",
}: IconWithBackgroundProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center w-8 h-8 rounded-full",
				bgClassName,
				className
			)}
		>
			<Icon className={cn("w-4 h-4", iconClassName)} />
		</span>
	);
}
