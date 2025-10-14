"use client";

import { AdminSchoolsApi } from "@/api/admin-schools.api";
import { AdminUsersApi } from "@/api/admin-users.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchoolFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	address: z.string().nonempty("Endereço é obrigatório"),
	directorId: z.string().nonempty("Diretor é obrigatório"),
});

export type AdminCreateSchoolFormData = z.infer<typeof createSchoolFormSchema>;

interface AdminCreateSchoolFormProps {
	onSuccess: () => void;
}

export function AdminCreateSchoolForm({
	onSuccess,
}: AdminCreateSchoolFormProps) {
	const form = useForm<AdminCreateSchoolFormData>({
		resolver: zodResolver(createSchoolFormSchema),
		defaultValues: {
			name: "",
			address: "",
			directorId: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: AdminCreateSchoolFormData) {
		try {
			await AdminSchoolsApi.create(data);
			onSuccess();
			router.refresh();
			toast.success("Escola criada com sucesso");
		} catch (error) {
			toast.error("Erro ao criar escola", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: directors, isPending: isLoadingDirectors } = useQuery({
		queryKey: ["directors-create-school"],
		queryFn: async () => {
			const data = await AdminUsersApi.findAll({
				role: ProfileRoleEnum.DIRECTOR,
				skip: 0,
				take: 1000,
			});
			return data.users;
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Nome</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Nome da escola.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Endereço</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Endereço da escola.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="directorId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Diretor</FormLabel>
								<Select
									disabled={
										field.disabled || isLoadingDirectors
									}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione um diretor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingDirectors ? (
											<SelectItem
												value="loading"
												disabled
											>
												Carregando...
											</SelectItem>
										) : (
											directors &&
											directors.map((director: User) => (
												<SelectItem
													key={director?.profile?.id}
													value={
														director?.profile?.id ||
														""
													}
												>
													{director.fullName}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Diretor responsável pela escola.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
						icon={<PlusIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Criar Escola
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
