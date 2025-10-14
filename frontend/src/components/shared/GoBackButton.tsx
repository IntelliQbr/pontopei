"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

export function GoBackButton(props: ComponentProps<"button">) {
	const router = useRouter();

	return (
		<Button onClick={() => router.back()} {...props}>
			<ArrowLeftIcon className="w-4 h-4" />
			<span>Voltar</span>
		</Button>
	);
}
