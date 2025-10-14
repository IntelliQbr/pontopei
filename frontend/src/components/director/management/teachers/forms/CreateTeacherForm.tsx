"use client";

import { SchoolsApi } from "@/api/schools.api";
import { Loader } from "@/components/shared/Loader";
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
import { api } from "@/lib/axios";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createTeacherFormFormSchema = z.object({
	fullName: z.string().nonempty("Nome é obrigatório"),
	email: z.string().nonempty("Email é obrigatório"),
	password: z
		.string()
		.nonempty("Senha é obrigatória")
		.min(8, "Senha deve ter no mínimo 8 caracteres")
		.max(16, "Senha deve ter no máximo 16 caracteres"),
	schoolId: z.string("Escola é obrigatória").nonempty("Escola é obrigatória"),
	avatarUrl: z.string().optional(),
});

export type CreateTeacherFormFormData = z.infer<
	typeof createTeacherFormFormSchema
>;

interface CreateTeacherFormProps {
	onSuccess: () => void;
}

export function CreateTeacherForm({ onSuccess }: CreateTeacherFormProps) {
	const form = useForm<CreateTeacherFormFormData>({
		resolver: zodResolver(createTeacherFormFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			schoolId: "",
			avatarUrl: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: CreateTeacherFormFormData) {
		try {
			await api.post("/teachers", data);
			onSuccess();

			router.refresh();
			toast.success("Professor criado com sucesso");
		} catch (error) {
			toast.error("Erro ao criar professor", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: schools, isPending } = useQuery({
		queryKey: ["schools-create-teacher"],
		queryFn: () =>
			SchoolsApi.findAllSchoolsToDirector({ skip: 0, take: 1000 }),
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
									Nome do professor.
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
									Email do professor.
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
								<FormLabel required>Senha</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormDescription>
									Senha do professor.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="schoolId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Escola</FormLabel>
								<Select
									disabled={field.disabled}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione uma escola" />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{isPending ? (
											<Loader className="text-primary" />
										) : (
											schools?.schools.map((school) => (
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
				</div>

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
								Avatar do professor.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
						icon={<PlusIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Criar Professor
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
