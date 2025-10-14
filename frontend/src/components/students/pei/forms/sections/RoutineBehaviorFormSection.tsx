"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function RoutineBehaviorFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Rotina e Comportamento em Casa
			</h3>

			<FormField
				control={form.control}
				name="step3.rotinaEstruturada"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Rotina estruturada?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sim"
										id="rotina-sim"
									/>
									<Label htmlFor="rotina-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="rotina-nao"
									/>
									<Label htmlFor="rotina-nao">Não</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="parcial"
										id="rotina-parcial"
									/>
									<Label htmlFor="rotina-parcial">
										Parcial
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.segueComandosCasa"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Segue comandos em casa?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sim"
										id="comandos-casa-sim"
									/>
									<Label htmlFor="comandos-casa-sim">
										Sim
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="comandos-casa-nao"
									/>
									<Label htmlFor="comandos-casa-nao">
										Não
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="apoio-visual"
										id="comandos-apoio"
									/>
									<Label htmlFor="comandos-apoio">
										Só com apoio visual/repetição
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.nivelIndependencia"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Nível de independência:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="totalmente-dependente"
										id="dep-total"
									/>
									<Label htmlFor="dep-total">
										Totalmente dependente
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="muito-apoio"
										id="muito-apoio"
									/>
									<Label htmlFor="muito-apoio">
										Muito apoio
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="parcialmente-independente"
										id="parcial-indep"
									/>
									<Label htmlFor="parcial-indep">
										Parcialmente independente
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="independente-maioria"
										id="indep-maioria"
									/>
									<Label htmlFor="indep-maioria">
										Independente maioria das tarefas
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="totalmente-independente"
										id="total-indep"
									/>
									<Label htmlFor="total-indep">
										Totalmente independente
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.comunicacaoCasa"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>Comunicação em casa:</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva como a criança se comunica em casa..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
