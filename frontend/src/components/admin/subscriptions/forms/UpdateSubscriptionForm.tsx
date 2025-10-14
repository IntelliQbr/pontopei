"use client";

import { AdminSubscriptionsApi } from "@/api/admin-subscriptions.api";
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
import { planNames, planStatusLabels } from "@/data/plans.data";
import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { Subscription } from "@/models/interfaces/subscription/subscription.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Schema baseado no DTO
const updateSubscriptionFormSchema = z.object({
	price: z.number().min(0.5, "O preço deve ser maior que R$0.50"),
	status: z.enum(
		Object.values(SubscriptionStatusEnum) as [string, ...string[]],
		{
			message: "O status deve ser válido.",
		}
	),
	planType: z.enum(
		Object.values(SubscriptionPlanEnum) as [string, ...string[]],
		{
			message: "O tipo de plano deve ser válido.",
		}
	),
	limits: z.object({
		maxStudents: z.number().int().min(1),
		maxPeiPerTrimester: z.number().int().min(1),
		maxWeeklyPlans: z.number().int().min(1),
	}),
	features: z.object({
		premiumSupport: z.boolean(),
	}),
});

export type UpdateSubscriptionFormData = z.infer<
	typeof updateSubscriptionFormSchema
>;

interface UpdateSubscriptionFormProps {
	subscription: Subscription;
	onSuccess: () => void;
}

export function UpdateSubscriptionForm({
	subscription,
	onSuccess,
}: UpdateSubscriptionFormProps) {
	const form = useForm<UpdateSubscriptionFormData>({
		resolver: zodResolver(updateSubscriptionFormSchema),
		defaultValues: {
			price: subscription.price || 0.5,
			status: subscription.status,
			planType: subscription.planType,
			limits: {
				maxStudents: subscription.limits?.maxStudents || 1,
				maxPeiPerTrimester:
					subscription.limits?.maxPeiPerTrimester || 1,
				maxWeeklyPlans: subscription.limits?.maxWeeklyPlans || 1,
			},
			features: {
				premiumSupport: subscription.features?.premiumSupport || false,
			},
		},
	});

	const router = useRouter();

	async function onSubmit(data: UpdateSubscriptionFormData) {
		try {
			await AdminSubscriptionsApi.update(subscription.id, data);
			toast.success("Assinatura atualizada com sucesso.");
			router.refresh();
			onSuccess();
		} catch (error) {
			toast.error("Erro ao atualizar assinatura", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

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

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
												field.onChange(
													isNaN(value) ? 0.5 : value
												);
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

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione o status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(
												SubscriptionStatusEnum
											).map((status) => (
												<SelectItem
													key={status}
													value={status}
												>
													{planStatusLabels[status]}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Status da assinatura.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="planType"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>
										Tipo de Plano
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione o tipo de plano" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(
												SubscriptionPlanEnum
											).map((plan) => (
												<SelectItem
													key={plan}
													value={plan}
												>
													{planNames[plan]}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Tipo de plano da assinatura.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Seção 2: Limites */}
				<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
					<div>
						<h2 className="text-xl font-semibold">Limites</h2>
						<Separator className="mt-2" />
						<p className="text-sm text-muted-foreground mt-2">
							Limites de uso da assinatura.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
												field.onChange(
													isNaN(value)
														? 1
														: Math.floor(value)
												);
											}}
										/>
									</FormControl>
									<FormDescription>
										Informe o limite de alunos.
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
												field.onChange(
													isNaN(value)
														? 1
														: Math.floor(value)
												);
											}}
										/>
									</FormControl>
									<FormDescription>
										Informe o limite de PEIs por trimestre.
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
												field.onChange(
													isNaN(value)
														? 1
														: Math.floor(value)
												);
											}}
										/>
									</FormControl>
									<FormDescription>
										Informe o limite de planos semanais.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Seção 3: Recursos */}
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

				{/* Botão de Submit */}
				<div className="flex justify-center pt-4">
					<SubmitButton
						className="w-full sm:w-auto min-w-[200px] h-12"
						icon={<SaveIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Atualizar assinatura
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
