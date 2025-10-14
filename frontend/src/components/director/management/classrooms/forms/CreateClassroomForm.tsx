"use client";

import { SchoolsApi } from "@/api/schools.api";
import { Loader } from "@/components/shared/Loader";
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
import { classPeriodsLabels } from "@/data/classroom.data";
import { api } from "@/lib/axios";
import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createClassroomFormFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	capacity: z
		.number()
		.min(1, "Capacidade deve ser maior que 0")
		.transform((val) => Number(val)),
	grade: z.string().nonempty("Série é obrigatória"),
	period: z.enum(ClassPeriodEnum, {
		message: "Período é obrigatório",
	}),
	schoolId: z.string("Escola é obrigatória").nonempty("Escola é obrigatória"),
});

export type CreateClassroomFormFormData = z.infer<
	typeof createClassroomFormFormSchema
>;

interface CreateClassroomFormProps {
	onSuccess: () => void;
}

export function CreateClassroomForm({ onSuccess }: CreateClassroomFormProps) {
	const form = useForm<CreateClassroomFormFormData>({
		resolver: zodResolver(createClassroomFormFormSchema),
		defaultValues: {
			name: "",
			capacity: 0,
			grade: "",
			period: ClassPeriodEnum.MORNING,
		},
	});

	const router = useRouter();

	async function onSubmit(data: CreateClassroomFormFormData) {
		try {
			await api.post("/classrooms", data);
			onSuccess();

			router.refresh();
			toast.success("Sala de aula criada com sucesso");
		} catch (error) {
			toast.error("Erro ao criar sala de aula", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: schools, isPending } = useQuery({
		queryKey: ["schools-create-classroom"],
		queryFn: () =>
			SchoolsApi.findAllSchoolsToDirector({ skip: 0, take: 1000 }),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
									Nome da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Capacidade (PEIs)
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) => {
											const value = e.target.value;
											field.onChange(Number(value));
										}}
									/>
								</FormControl>
								<FormDescription>
									Capacidade da sala de aula (PEIs).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="period"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Período</FormLabel>
								<FormControl>
									<Select
										disabled={field.disabled}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o período" />
										</SelectTrigger>

										<SelectContent>
											{Object.values(ClassPeriodEnum).map(
												(period) => (
													<SelectItem
														key={period}
														value={period}
													>
														{
															classPeriodsLabels[
																period
															]
														}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									Período da turma.
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
											schools?.schools.map(
												(school: {
													id: string;
													name: string;
												}) => (
													<SelectItem
														key={school.id}
														value={school.id}
													>
														{school.name}
													</SelectItem>
												)
											)
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Escola da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="grade"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Série/Turma</FormLabel>
								<FormControl>
									<Input placeholder="Ex: 1B" {...field} />
								</FormControl>
								<FormDescription>
									Série/Turma da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-purple-400 to-purple-600 hover:opacity-90"
						icon={<PlusIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Criar Sala de Aula
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
