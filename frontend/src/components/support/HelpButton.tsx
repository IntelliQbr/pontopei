import { cn } from "@/lib/utils";
import { HelpCircleIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

export const whatsappLink = "https://wa.me/5515991615864";

export function HelpButton(props: ComponentProps<"button">) {
	return (
		<Button
			{...props}
			className={cn("flex items-center gap-2 z-50", props.className)}
			asChild
		>
			<Link href={whatsappLink} target="_blank">
				<HelpCircleIcon className="w-4 h-4" />
				<span className="sm:block hidden">Precisa de ajuda?</span>
			</Link>
		</Button>
	);
}
