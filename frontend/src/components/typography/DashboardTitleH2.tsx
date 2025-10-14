import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { H2 } from "./H2";

interface DashboardTitleH2Props {
	children: React.ReactNode;
	Icon: LucideIcon;
	asChild?: boolean;
	className?: string;
}

export function DashboardTitleH2({
	children,
	Icon,
	className,
}: DashboardTitleH2Props) {
	return (
		<H2
			className={cn(
				"self-start text-lg font-semibold flex items-center gap-3",
				className
			)}
		>
			<div className="bg-gradient-to-r from-primary/10 to-primary/20 p-3 text-primary border border-primary/20 rounded-full flex items-center justify-center shadow-md">
				<Icon className="w-4 h-4" />
			</div>
			<span className="decoration-primary/50 decoration-2">
				{children}
			</span>
		</H2>
	);
}
