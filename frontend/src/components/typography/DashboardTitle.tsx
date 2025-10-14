import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { H1 } from "./H1";

interface DashboardTitleProps {
	children: React.ReactNode;
	Icon: LucideIcon;
	asChild?: boolean;
	className?: string;
}

export function DashboardTitle({
	children,
	Icon,
	className,
}: DashboardTitleProps) {
	return (
		<H1
			className={cn(
				"self-start text-2xl font-bold flex items-center gap-3",
				className
			)}
		>
			<div className="bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 text-background flex items-center justify-center shadow-md">
				<Icon className="w-6 h-6" />
			</div>
			<span className="underline decoration-primary/50 decoration-2 underline-offset-4">
				{children}
			</span>
		</H1>
	);
}
