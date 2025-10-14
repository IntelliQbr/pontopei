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
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function PraticalSkillsFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Habilidades Práticas
			</h3>
			<FormField
				control={form.control}
				name="step3.comerSozinho"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Consegue comer sozinho?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-consegue"
										id="comer-nao"
									/>
									<Label htmlFor="comer-nao">
										Não consegue
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="ajuda-total"
										id="comer-ajuda-total"
									/>
									<Label htmlFor="comer-ajuda-total">
										Come com ajuda total
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="ajuda-parcial"
										id="comer-ajuda-parcial"
									/>
									<Label htmlFor="comer-ajuda-parcial">
										Come com ajuda parcial
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sozinho-bagunca"
										id="comer-bagunca"
									/>
									<Label htmlFor="comer-bagunca">
										Come sozinho bagunçando
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sozinho-organizado"
										id="comer-organizado"
									/>
									<Label htmlFor="comer-organizado">
										Come sozinho organizadamente
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
				name="step3.vestirSozinho"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Consegue se vestir sozinho?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-consegue"
										id="vestir-nao"
									/>
									<Label htmlFor="vestir-nao">
										Não consegue
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="ajuda-total"
										id="vestir-ajuda-total"
									/>
									<Label htmlFor="vestir-ajuda-total">
										Veste com ajuda total
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="ajuda-parcial"
										id="vestir-ajuda-parcial"
									/>
									<Label htmlFor="vestir-ajuda-parcial">
										Veste com ajuda parcial
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="pecas-simples"
										id="vestir-simples"
									/>
									<Label htmlFor="vestir-simples">
										Veste sozinho peças simples
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="roupas-complexas"
										id="vestir-complexas"
									/>
									<Label htmlFor="vestir-complexas">
										Veste sozinho roupas complexas
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name="step3.usaBanheiroSozinho"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel required>
								Usa o banheiro sozinho?
							</FormLabel>
							<FormControl>
								<RadioGroup
									disabled={field.disabled}
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="usa-fraldas"
											id="fraldas"
										/>
										<Label htmlFor="fraldas">
											Usa fraldas
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="ajuda"
											id="banheiro-ajuda"
										/>
										<Label htmlFor="banheiro-ajuda">
											Vai ao banheiro com ajuda
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="precisa-lembrar"
											id="precisa-lembrar"
										/>
										<Label htmlFor="precisa-lembrar">
											Vai sozinho mas precisa lembrar
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="sozinho-sempre"
											id="sozinho-sempre"
										/>
										<Label htmlFor="sozinho-sempre">
											Vai sozinho sempre
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="totalmente-independente"
											id="banheiro-indep"
										/>
										<Label htmlFor="banheiro-indep">
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
					name="step3.dificuldadeAlimentar"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel required>
								Dificuldade alimentar?
							</FormLabel>
							<FormControl>
								<RadioGroup
									disabled={field.disabled}
									className="flex flex-col gap-3"
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="sim"
											id="dif-alim-sim"
										/>
										<Label htmlFor="dif-alim-sim">
											Sim
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="nao"
											id="dif-alim-nao"
										/>
										<Label htmlFor="dif-alim-nao">
											Não
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="avaliacao"
											id="dif-alim-aval"
										/>
										<Label htmlFor="dif-alim-aval">
											Em avaliação
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
