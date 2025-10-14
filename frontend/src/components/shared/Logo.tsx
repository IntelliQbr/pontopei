import { BlocksIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export function Logo(props: ComponentProps<"div">) {
	return (
		<div {...props}>
			<Link
				href="/"
				title="Ponto PEI"
				className="flex items-end gap-1 text-2xl font-semibold"
			>
				<span className="bg-primary p-2 rounded text-background flex items-center gap-1">
					<BlocksIcon />
					<span>Ponto</span>
				</span>
				<span>PEI</span>
			</Link>
		</div>
	);
}
