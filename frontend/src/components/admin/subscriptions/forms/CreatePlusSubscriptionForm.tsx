"use client";

import { AdminSubscriptionsApi } from "@/api/admin-subscriptions.api";
import { AdminUsersApi } from "@/api/admin-users.api";
import { CopyButton } from "@/components/shared/CopyButton";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
	addDays,
	addMonths,
	differenceInDays,
	differenceInMonths,
	format,
} from "date-fns";
import {
	CalendarIcon,
	CheckCircleIcon,
	ClockIcon,
	CreditCardIcon,
	PlusIcon,
	XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createPlusSubscriptionFormFormSchema = z
	.object({
		price: z.number().min(0.5, "O preço deve ser maior que R$0.50"),
		limits: z.object({
			maxStudents: z
				.number()
				.int("O número máximo de estudantes deve ser um número inteiro")
				.min(1, "O número máximo de estudantes deve ser pelo menos 1"),
			maxPeiPerTrimester: z
				.number()
				.int(
					"O número máximo de PEIs por trimestre deve ser um número inteiro"
				)
				.min(
					1,
					"O número máximo de PEIs por trimestre deve ser pelo menos 1"
				),
			maxWeeklyPlans: z
				.number()
				.int(
					"O número máximo de planos semanais deve ser um número inteiro"
				)
				.min(
					1,
					"O número máximo de planos semanais deve ser pelo menos 1"
				),
		}),
		features: z.object({
			premiumSupport: z.boolean(),
		}),
		startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
			message: "A data de início da recorrência deve ser uma data válida",
		}),
		endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
			message:
				"A data de término da recorrência deve ser uma data válida",
		}),
		frequency: z
			.number()
			.int("A frequência deve ser um número inteiro")
			.min(1, "A frequência deve ser pelo menos 1"),
		frequencyType: z.enum(["day", "month"], {
			message: "O tipo de frequência é obrigatório",
		}),
		enableSubscriptionNow: z.boolean(),
		directorId: z.string().nonempty("O ID do diretor é obrigatório"),
	})
	.refine(
		(data) => {
			// Validação customizada para verificar se o período comporta a frequência
			const startDate = new Date(data.startDate);
			const endDate = new Date(data.endDate);

			let totalPeriods = 0;

			switch (data.frequencyType) {
				case "day":
					totalPeriods = differenceInDays(endDate, startDate);
					break;
				case "month":
					totalPeriods = differenceInMonths(endDate, startDate);
					break;
			}

			// Deve haver pelo menos 1 período completo para a frequência escolhida
			if (totalPeriods < data.frequency) {
				return false;
			}

			return true;
		},
		{
			message:
				"O período entre as datas deve comportar pelo menos um ciclo completo da frequência escolhida",
			path: ["frequency"],
		}
	);

export type CreatePlusSubscriptionFormFormData = z.infer<
	typeof createPlusSubscriptionFormFormSchema
>;

export function CreatePlusSubscriptionForm() {
	const [checkoutLink, setCheckoutLink] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<CreatePlusSubscriptionFormFormData>({
		resolver: zodResolver(createPlusSubscriptionFormFormSchema),
		defaultValues: {
			price: 0.5,
			limits: {
				maxStudents: 1,
				maxPeiPerTrimester: 1,
				maxWeeklyPlans: 1,
			},
			features: {
				premiumSupport: true,
			},
			startDate: format(new Date(), "yyyy-MM-dd"),
			endDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
			frequency: 1,
			frequencyType: "month",
			enableSubscriptionNow: true,
			directorId: "",
		},
	});

	// Função para calcular informações sobre a frequência
	const getFrequencyInfo = () => {
		const startDate = form.watch("startDate");
		const endDate = form.watch("endDate");
		const frequency = form.watch("frequency");
		const frequencyType = form.watch("frequencyType");

		if (!startDate || !endDate || !frequency || !frequencyType) {
			return null;
		}

		const start = new Date(startDate);
		const end = new Date(endDate);

		let totalPeriods = 0;
		let periodName = "";
		let possibleCharges = 0;

		switch (frequencyType) {
			case "day":
				totalPeriods = differenceInDays(end, start);
				periodName = "dias";
				possibleCharges = Math.floor(totalPeriods / frequency) + 1;
				break;
			case "month":
				totalPeriods = differenceInMonths(end, start);
				periodName = "meses";
				possibleCharges = Math.floor(totalPeriods / frequency) + 1;
				break;
		}

		const isValid = totalPeriods >= frequency;

		return {
			totalPeriods,
			periodName,
			possibleCharges,
			isValid,
			frequencyText: `A cada ${frequency} ${periodName}`,
		};
	};

	const frequencyInfo = getFrequencyInfo();

	async function onSubmit(data: CreatePlusSubscriptionFormFormData) {
		try {
			const response = await AdminSubscriptionsApi.create({
				...data,
				startDate: new Date(data.startDate).toISOString(),
				endDate: new Date(data.endDate).toISOString(),
			});
			toast.success(
				"Assinatura criada com sucesso. Envie o link para o diretor para que ele possa realizar o pagamento."
			);

			setCheckoutLink(response.checkoutUrl);
			router.refresh();
		} catch (error) {
			toast.error("Erro ao criar assinatura", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: directors, isLoading: isLoadingDirectors } = useQuery({
		queryKey: ["directors"],
		queryFn: async () => {
			const { users } = await AdminUsersApi.findAll({
				role: ProfileRoleEnum.DIRECTOR,
				take: 1000,
			});

			return users;
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Seção 1: Informações Básicas */}
				<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
					<div>
						<h2 className="text-xl font-semibold">
							Informações Básicas
						</h2>
						<Separator className="mt-2" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
											<SelectTrigger className="w-full max-w-full truncate">
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
															{director.fullName}{" "}
															- {director.email}
														</SelectItem>
													)
												)
											)}
										</SelectContent>
									</Select>
									<FormDescription>
										Diretor responsável pela assinatura.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Preço (R$)</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											min={0.5}
											step="0.01"
											onChange={(e) => {
												const value =
													e.target.valueAsNumber;
												if (!isNaN(value)) {
													field.onChange(value);
												} else {
													field.onChange(0.5);
												}
											}}
										/>
									</FormControl>
									<FormDescription>
										Informe o preço da assinatura.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Seção 2: Período e Configurações */}
				<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
					<div>
						<h2 className="text-xl font-semibold">
							Período e Configurações
						</h2>
						<Separator className="mt-2" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>
											Data de início
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="date"
												min={format(
													new Date(),
													"yyyy-MM-dd"
												)}
											/>
										</FormControl>
										<FormDescription>
											Informe a data de início da
											assinatura.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="endDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>
											Data de término
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="date"
												min={format(
													addDays(
														new Date(
															`${form.watch(
																"startDate"
															)}T00:00`
														),
														1
													),
													"yyyy-MM-dd"
												)}
											/>
										</FormControl>
										<FormDescription>
											Informe a data de término da
											assinatura.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="enableSubscriptionNow"
							render={({ field }) => (
								<FormItem className="flex flex-col justify-center rounded-lg border p-4 shadow-sm h-fit">
									<div className="flex flex-row items-center justify-between space-y-0">
										<div className="space-y-1">
											<FormLabel>
												Ativar assinatura agora
											</FormLabel>
											<FormDescription className="text-xs">
												Ativar a assinatura agora. Se
												não ativada, a assinatura será
												ativada no dia da data de
												início.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												disabled={
													!form.watch("startDate") ||
													new Date(
														form.watch("startDate")
													).getTime() >
														new Date().getTime()
												}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Seção 3: Frequência de Cobrança */}
				<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
					<div>
						<h2 className="text-xl font-semibold">
							Frequência de Cobrança
						</h2>
						<Separator className="mt-2" />
						<p className="text-sm text-muted-foreground mt-2">
							Configure com que frequência a cobrança será
							realizada.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="frequency"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Frequência</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											min={1}
											onChange={(e) => {
												const value =
													e.target.valueAsNumber;
												if (
													!isNaN(value) &&
													value > 0
												) {
													field.onChange(
														Math.floor(value)
													);
												} else {
													field.onChange(1);
												}
											}}
										/>
									</FormControl>
									<FormDescription>
										A cada quantas unidades de tempo cobrar.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="frequencyType"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>
										Tipo de Frequência
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione o tipo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="day">
												Dias
											</SelectItem>
											<SelectItem value="month">
												Meses
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Unidade de tempo para a frequência.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Informações sobre a frequência */}
					{frequencyInfo && (
						<div
							className={`p-4 rounded-lg border ${
								frequencyInfo.isValid
									? "bg-green-50 border-green-200"
									: "bg-red-50 border-red-200"
							}`}
						>
							<div className="space-y-3">
								{frequencyInfo.isValid ? (
									<div className="text-green-600 font-medium flex items-center gap-2">
										<CheckCircleIcon className="size-4" />
										<span>Configuração válida</span>
									</div>
								) : (
									<div className="text-red-600 font-medium flex items-center gap-2">
										<XCircleIcon className="size-4" />
										<span>Configuração inválida</span>
									</div>
								)}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
									<div className="flex items-center gap-2">
										<CalendarIcon className="size-4" />
										<span>
											<strong>Frequência:</strong>{" "}
											{frequencyInfo.frequencyText}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ClockIcon className="size-4" />
										<span>
											<strong>Período total:</strong>{" "}
											{frequencyInfo.totalPeriods}{" "}
											{frequencyInfo.periodName}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<CreditCardIcon className="size-4" />
										<span>
											<strong>
												Cobranças estimadas:
											</strong>{" "}
											{frequencyInfo.possibleCharges}x
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Seção 4: Limites e Recursos */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Limites */}
					<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
						<div>
							<h2 className="text-xl font-semibold">Limites</h2>
							<Separator className="mt-2" />
							<p className="text-sm text-muted-foreground mt-2">
								Limites de uso da assinatura.
							</p>
						</div>

						<div className="space-y-4 ">
							<FormField
								control={form.control}
								name="limits.maxStudents"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>
											Limite de alunos
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={1}
												onChange={(e) => {
													const value =
														e.target.valueAsNumber;
													if (!isNaN(value)) {
														field.onChange(value);
													} else {
														field.onChange(0);
													}
												}}
											/>
										</FormControl>
										<FormDescription>
											Informe o limite de alunos da
											assinatura.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="limits.maxPeiPerTrimester"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>
											Limite de PEIs por trimestre
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={1}
												onChange={(e) => {
													const value =
														e.target.valueAsNumber;
													if (!isNaN(value)) {
														field.onChange(value);
													} else {
														field.onChange(0);
													}
												}}
											/>
										</FormControl>
										<FormDescription>
											Informe o limite de PEIs por
											trimestre da assinatura.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="limits.maxWeeklyPlans"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>
											Limite de planos semanais
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={1}
												onChange={(e) => {
													const value =
														e.target.valueAsNumber;
													if (!isNaN(value)) {
														field.onChange(value);
													} else {
														field.onChange(0);
													}
												}}
											/>
										</FormControl>
										<FormDescription>
											Informe o limite de planos semanais
											da assinatura.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* Recursos */}
					<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
						<div>
							<h2 className="text-xl font-semibold">Recursos</h2>
							<Separator className="mt-2" />
							<p className="text-sm text-muted-foreground mt-2">
								Recursos da assinatura.
							</p>
						</div>

						<FormField
							control={form.control}
							name="features.premiumSupport"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
									<div className="space-y-1">
										<FormLabel>Suporte premium</FormLabel>
										<FormDescription>
											Ativar suporte premium. Suporte
											prioritário para os usuários da
											assinatura.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Link de Checkout */}
				{checkoutLink && (
					<div className="bg-primary/5 border-2 border-primary/30 p-4 rounded-lg">
						<h3 className="flex items-center gap-2 text-green-600 font-medium mb-3">
							<CheckCircleIcon className="size-4" />
							<span>Link para pagamento</span>
						</h3>
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
							<div className="flex-1 min-w-0">
								<Link
									href={checkoutLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 bg-primary/10 p-2 rounded font-mono text-sm break-all hover:bg-primary/20 transition-colors"
								>
									{checkoutLink}
								</Link>
							</div>
							<CopyButton
								variant="default"
								textToCopy={checkoutLink}
							/>
						</div>
					</div>
				)}

				{/* Botão de Submit */}
				<div className="flex justify-center pt-4">
					<SubmitButton
						className="w-full sm:w-auto min-w-[200px] h-12"
						icon={<PlusIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Criar assinatura
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
