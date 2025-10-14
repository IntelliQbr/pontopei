"use client";

import { AdminUsersApi } from "@/api/admin-users.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const setAdminUserFormSchema = z.object({
	isAdmin: z.boolean(),
});

export type SetAdminUserFormData = z.infer<typeof setAdminUserFormSchema>;

interface SetAdminUserFormProps {
	user: User;
	onSuccess: () => void;
}

export function SetAdminUserForm({ user, onSuccess }: SetAdminUserFormProps) {
	const form = useForm<SetAdminUserFormData>({
		resolver: zodResolver(setAdminUserFormSchema),
		defaultValues: {
			isAdmin: user?.isAdmin || false,
		},
	});

	const router = useRouter();

	async function onSubmit(data: SetAdminUserFormData) {
		try {
			await AdminUsersApi.setAdmin(user.id, data);
			onSuccess();

			router.refresh();
			toast.success("Permissões atualizadas com sucesso");
		} catch (error) {
			toast.error("Erro ao atualizar permissões", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="isAdmin"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
								<FormControl>
									<input
										type="checkbox"
										checked={field.value}
										onChange={field.onChange}
										className="w-4 h-4 text-purple-600"
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Administrador</FormLabel>
									<FormDescription>
										Define se o usuário terá permissões de
										administrador.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-2 justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90"
						icon={<ShieldIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Atualizar Permissões
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
