"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCardIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import { CreatePlusSubscriptionForm } from "./forms/CreatePlusSubscriptionForm";

export function CreatePlusSubscriptionDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					size={"lg"}
					className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
				>
					<StarIcon className="w-4 h-4" />
					<span>Nova Assinatura Plus</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-5xl sm:max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<CreditCardIcon className="w-4 h-4" />
						<span>Nova Assinatura Plus</span>
					</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar uma nova assinatura
						Plus.
					</DialogDescription>
				</DialogHeader>
				<CreatePlusSubscriptionForm />
			</DialogContent>
		</Dialog>
	);
}
