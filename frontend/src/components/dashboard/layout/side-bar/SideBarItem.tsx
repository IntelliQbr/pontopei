import { cn } from "@/lib/utils";
import Link from "next/link";

interface SideBarItemProps {
	icon: React.ReactNode;
	children: React.ReactNode;
	href: string;
	isOpen: boolean;
	isActive?: boolean;
	soon?: boolean;
}

export function SideBarItem({
	icon,
	children,
	href,
	isOpen,
	isActive,
	soon,
}: SideBarItemProps) {
	return (
		<Link
			href={href}
			aria-label={children?.toString()}
			className={cn(
				"flex items-center gap-2 p-2 rounded-md hover:bg-background/20  text-background font-semibold cursor-pointer transition-all duration-150",
				isActive && "bg-background text-primary hover:bg-background"
			)}
		>
			<div className="ml-1">{icon}</div>
			<span
				className={cn(
					"overflow-hidden inline-block",
					"transition-all duration-150 ease-in-out whitespace-nowrap",
					isOpen
						? "opacity-100 max-w-[200px] mr-2"
						: "opacity-0 max-w-0"
				)}
			>
				<div className="flex items-center gap-2">
					{children}
					<span className="text-xs text-gray-300">
						{soon && "(Em breve)"}
					</span>
				</div>
			</span>
		</Link>
	);
}
