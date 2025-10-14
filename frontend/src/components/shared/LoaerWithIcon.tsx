import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Loader } from "./Loader";

interface LoaerWithIconProps extends ComponentProps<"div"> {
	icon: React.ReactNode;
}

export function LoaderWithIcon({
	icon,
	className,
	...props
}: LoaerWithIconProps) {
	return (
		<div
			{...props}
			className={cn(
				"flex flex-col items-center gap-2 text-primary",
				className
			)}
		>
			<div className="bg-primary/10 rounded-full p-2">{icon}</div>
			<div className="flex items-center gap-2 text-primary">
				<Loader />
				<span>Carregando...</span>
			</div>
		</div>
	);
}
