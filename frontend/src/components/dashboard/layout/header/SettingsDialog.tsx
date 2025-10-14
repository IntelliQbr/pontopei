"use client";

import { UpdateProfileForm } from "@/components/profile/forms/UpdateProfileForm";
import { SuscriptionCard } from "@/components/subscription/SuscriptionCard";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { ComponentProps, useState } from "react";

export function SettingsDialog(props: ComponentProps<"button">) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					{...props}
					variant={"ghost"}
					size={"icon"}
					className={cn("rounded-full text-primary", props.className)}
				>
					<span className="sm:sr-only not-sr-only">
						Configurações
					</span>
					<SettingsIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:w-full max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Configurações</DialogTitle>
					<DialogDescription>
						Aqui você pode configurar suas preferências e
						personalizar o seu perfil.
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue="profile">
					<TabsList className="w-full">
						<TabsTrigger
							className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-background"
							value="profile"
						>
							<UserIcon className="w-4 h-4" />
							<span>Perfil</span>
						</TabsTrigger>
						<TabsTrigger
							className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-background"
							value="subscription"
						>
							<CreditCardIcon className="w-4 h-4" />
							<span>Assinatura</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="profile">
						<UpdateProfileForm onSuccess={() => setIsOpen(false)} />
					</TabsContent>
					<TabsContent value="subscription">
						<SuscriptionCard
							onCancelSubscription={() => setIsOpen(false)}
						/>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
