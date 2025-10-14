"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FormSectionProps } from "../create-student-and-pei-form.schema";

export function TargetAdaptationsFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Adaptações e Metas
			</h3>

			<FormField
				control={form.control}
				name="step2.principaisDesafios"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Principais Desafios Observados (2-3 maiores
							desafios):
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Ex: Dificuldade em manter o foco em atividades por mais de 5 minutos..."
								rows={4}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.estrategiasFuncionam"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Estratégias e Adaptações que JÁ Funcionam:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Ex: Uso de rotinas visuais com figuras para transições..."
								rows={4}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="space-y-4">
				<h4 className="font-medium">
					Prioridades Pedagógicas para o Próximo Período:
				</h4>

				<div className="grid grid-cols-1 gap-4">
					<FormField
						control={form.control}
						name="step2.prioridade1"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Prioridade 1:</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Ex: Leitura e escrita funcional"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="step2.prioridade1Expectativa"
						render={({ field }) => (
							<FormItem>
								<FormLabel>O que se espera alcançar:</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Ex: Reconhecer 5 palavras de alta frequência..."
										rows={2}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4">
					<FormField
						control={form.control}
						name="step2.prioridade2"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Prioridade 2:</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Ex: Comunicação de necessidades"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="step2.prioridade2Expectativa"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									O que se espera alcançar:
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Ex: Usar prancha de comunicação para pedir 3 itens..."
										rows={2}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4">
					<FormField
						control={form.control}
						name="step2.prioridade3"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Prioridade 3:</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Ex: Redução de estereotipias vocais"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="step2.prioridade3Expectativa"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									O que se espera alcançar:
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Ex: Reduzir a frequência de estereotipias vocais em 50%..."
										rows={2}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<FormField
				control={form.control}
				name="step2.nivelApoio"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Nível de Apoio Necessário:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="minimo"
										id="apoio-minimo"
									/>
									<Label htmlFor="apoio-minimo">
										Apoio Mínimo: Aluno participa da maioria
										das atividades com pequenas adaptações
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="moderado"
										id="apoio-moderado"
									/>
									<Label htmlFor="apoio-moderado">
										Apoio Moderado: Aluno precisa de apoio
										frequente com adaptações significativas
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="extenso"
										id="apoio-extenso"
									/>
									<Label htmlFor="apoio-extenso">
										Apoio Extenso: Aluno necessita de apoio
										individualizado e contínuo
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
