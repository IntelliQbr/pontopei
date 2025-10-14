"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateProfileFormFormSchema = z.object({
	fullName: z.string().nonempty("Nome completo é obrigatório"),
	email: z.email("Email inválido"),
	avatarUrl: z.string().optional(),
});

export type UpdateProfileFormFormData = z.infer<
	typeof updateProfileFormFormSchema
>;

interface UpdateProfileFormProps {
	onSuccess: () => void;
}

export function UpdateProfileForm({ onSuccess }: UpdateProfileFormProps) {
	const { user, setUser } = useAuthContext();
	const form = useForm<UpdateProfileFormFormData>({
		resolver: zodResolver(updateProfileFormFormSchema),
		defaultValues: {
			fullName: user?.fullName || "",
			email: user?.email || "",
			avatarUrl: user?.profile?.avatarUrl || "",
		},
	});
	const router = useRouter();

	async function onSubmit(data: UpdateProfileFormFormData) {
		try {
			await api.patch("/profile/update", data);
			toast.success("Perfil atualizado com sucesso");
			setUser({
				...user!,
				fullName: data.fullName,
				email: data.email,
				profile: {
					...user!.profile,
					avatarUrl: data.avatarUrl ?? "",
				},
			});
			router.refresh();
			onSuccess();
		} catch (error) {
			toast.error("Erro ao atualizar perfil", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Nome completo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Este é o seu nome completo.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Este é o seu email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="avatarUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL do avatar</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Este é a URL do seu avatar.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
				<div className="flex justify-center">
					<Avatar className="w-24 h-24">
						<AvatarImage
							src={
								form.watch("avatarUrl") ||
								`https://avatar.vercel.sh/${form.watch(
									"email"
								)}`
							}
						/>
						<AvatarFallback>
							{form.watch("fullName")?.charAt(0)?.toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>

				<div className="flex justify-center">
					<SubmitButton
						icon={<SaveIcon />}
						isLoading={form.formState.isSubmitting}
						type="submit"
					>
						Salvar
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
