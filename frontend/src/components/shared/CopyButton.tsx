"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps extends ComponentProps<typeof Button> {
	textToCopy: string;
	onCopyChange?: (isCopied: boolean) => void;
}

export function CopyButton({
	textToCopy,
	onCopyChange,
	...props
}: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		if (!navigator.clipboard) {
			const copyArea = document.createElement("textarea");
			copyArea.value = textToCopy;

			copyArea.style.position = "fixed";
			copyArea.style.opacity = "0";

			document.body.appendChild(copyArea);

			copyArea.select();
			document.execCommand("copy");

			document.body.removeChild(copyArea);
		} else {
			navigator.clipboard.writeText(textToCopy);
		}

		setIsCopied(true);
		toast.success("Copiado para a área de transferência");

		onCopyChange?.(true);
	};

	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => {
				setIsCopied(false);
				onCopyChange?.(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isCopied, onCopyChange]);

	return (
		<Button
			{...props}
			onClick={handleCopy}
			size={"sm"}
			type="button"
			variant={props.variant || "outline"}
			className={cn("rounded-sm", props.className)}
		>
			{props.children}
			{isCopied ? (
				<CopyCheckIcon className="w-2 h-2" />
			) : (
				<CopyIcon className="w-2 h-2" />
			)}
		</Button>
	);
}
