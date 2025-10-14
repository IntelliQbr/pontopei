"use client";

import { AdminSchoolsApi } from "@/api/admin-schools.api";
import { AdminUsersApi } from "@/api/admin-users.api";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { profileRoleLabels } from "@/data/profile.data";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editUserFormSchema = z
	.object({
		fullName: z.string().nonempty("Nome é obrigatório"),
		email: z.email("Email inválido"),
		password: z
			.string()
			.nonempty("Senha é obrigatória")
			.min(8, "Senha deve ter no mínimo 8 caracteres")
			.max(20, "Senha deve ter no máximo 20 caracteres")
			.optional(),
		role: z.enum(["TEACHER", "DIRECTOR"]),
		avatarUrl: z.string().optional(),
		schoolId: z.string().optional(),
		directorId: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.role === "TEACHER" && !data.schoolId) {
				return false;
			}
			return true;
		},
		{
			message: "Escola é obrigatória para professores",
			path: ["schoolId"],
		}
	)
	.refine(
		(data) => {
			if (data.role === "TEACHER" && !data.directorId) {
				return false;
			}
			return true;
		},
		{
			message: "Diretor é obrigatório para professores",
			path: ["directorId"],
		}
	);

export type EditUserFormData = z.infer<typeof editUserFormSchema>;

interface EditUserFormProps {
	user: User;
	onSuccess: () => void;
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
	const form = useForm<EditUserFormData>({
		resolver: zodResolver(editUserFormSchema),
		defaultValues: {
			fullName: user?.fullName || "",
			email: user?.email || "",
			role: (user?.profile?.role as ProfileRoleEnum) || "DIRECTOR",
			avatarUrl: user?.profile?.avatarUrl || "",
			schoolId: user?.profile?.schoolId || "",
			directorId: user?.profile?.createdById || "",
		},
	});

	const router = useRouter();

	// Watch role to conditionally show fields
	const selectedRole = form.watch("role");

	async function onSubmit(data: EditUserFormData) {
		try {
			// Remove fields that aren't needed for the role
			if (data.role !== "TEACHER") {
				const { fullName, email, password, role, avatarUrl } = data;
				await AdminUsersApi.update(user.id, {
					fullName,
					email,
					password,
					role,
					avatarUrl,
				} as EditUserFormData);
			} else {
				await AdminUsersApi.update(user.id, data);
			}
			onSuccess();

			router.refresh();
			toast.success("Usuário editado com sucesso");
		} catch (error) {
			toast.error("Erro ao editar usuário", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: directors, isPending: isLoadingDirectors } = useQuery({
		queryKey: ["directors-edit-user"],
		queryFn: async () => {
			const data = await AdminUsersApi.findAll({
				role: ProfileRoleEnum.DIRECTOR,
				skip: 0,
				take: 1000,
			});

			return data.users;
		},
		enabled: selectedRole === "TEACHER",
	});

	const { data: schools, isPending: isLoadingSchools } = useQuery({
		queryKey: ["schools-edit-user", form.watch("directorId")],
		queryFn: async () => {
			form.setValue("schoolId", "");

			const directorId = form.watch("directorId");

			if (!directorId) {
				return [];
			}

			const data = await AdminSchoolsApi.findAllByDirectorId(directorId, {
				skip: 0,
				take: 1000,
			});

			return data.schools;
		},
		enabled: !!form.watch("directorId"),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Nome</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Nome completo do usuário.
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
									<Input type="email" {...field} />
								</FormControl>
								<FormDescription>
									Email do usuário.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha (Opcional)</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormDescription>
									Altere a senha do usuário.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Função</FormLabel>
								<Select
									disabled={field.disabled}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione uma função" />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{Object.values(ProfileRoleEnum).map(
											(role) => (
												<SelectItem
													key={role}
													value={role}
												>
													{profileRoleLabels[role]}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Função do usuário no sistema.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{selectedRole === "TEACHER" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="schoolId"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Escola</FormLabel>
									<Select
										disabled={
											field.disabled || isLoadingSchools
										}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione uma escola" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{isLoadingSchools ? (
												<SelectItem
													value="loading"
													disabled
												>
													Carregando...
												</SelectItem>
											) : (
												schools &&
												schools.map((school) => (
													<SelectItem
														key={school.id}
														value={school.id}
													>
														{school.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
									<FormDescription>
										Escola do professor.
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
												directors.map(
													(director: User) => (
														<SelectItem
															key={
																director.profile
																	?.id
															}
															value={
																director.profile
																	?.id || ""
															}
														>
															{director.fullName}
														</SelectItem>
													)
												)
											)}
										</SelectContent>
									</Select>
									<FormDescription>
										Diretor responsável.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				<FormField
					control={form.control}
					name="avatarUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							<div className="flex gap-4 items-center">
								<FormControl>
									<Input
										placeholder="Url da imagem ou gif..."
										{...field}
									/>
								</FormControl>
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={
											form.watch("avatarUrl") ||
											`https://avatar.vercel.sh/${form.watch(
												"email"
											)}`
										}
									/>
									<AvatarFallback>
										{form.watch("fullName").charAt(0)}
									</AvatarFallback>
								</Avatar>
							</div>
							<FormDescription>
								Avatar do usuário.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
						icon={<PenIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Editar Usuário
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
