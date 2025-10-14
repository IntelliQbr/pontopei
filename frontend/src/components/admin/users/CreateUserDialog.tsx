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
import { PlusIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { CreateUserForm } from "./forms/CreateUserForm";

export function CreateUserDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					size={"lg"}
					className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
				>
					<PlusIcon className="w-4 h-4" />
					<span>Novo Usuário</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						<span>Novo Usuário</span>
					</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar um novo usuário.
					</DialogDescription>
				</DialogHeader>
				<CreateUserForm onSuccess={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
