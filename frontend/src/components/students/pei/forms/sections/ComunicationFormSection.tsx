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
import { FormSectionProps } from "../create-student-and-pei-form.schema";

export function ComunicationFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Compreensão e Comunicação
			</h3>

			<FormField
				control={form.control}
				name="step2.compreendeComandosSimples"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							O aluno compreende comandos simples?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sim"
										id="cmd-simples-sim"
									/>
									<Label htmlFor="cmd-simples-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="cmd-simples-nao"
									/>
									<Label htmlFor="cmd-simples-nao">Não</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="parcialmente"
										id="cmd-simples-parcial"
									/>
									<Label htmlFor="cmd-simples-parcial">
										Parcialmente
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
				name="step2.compreendeComandosComplexos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							O aluno compreende comandos complexos?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sim"
										id="cmd-complexos-sim"
									/>
									<Label htmlFor="cmd-complexos-sim">
										Sim
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="cmd-complexos-nao"
									/>
									<Label htmlFor="cmd-complexos-nao">
										Não
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="parcialmente"
										id="cmd-complexos-parcial"
									/>
									<Label htmlFor="cmd-complexos-parcial">
										Parcialmente
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
				name="step2.comunicacaoSala"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Como você descreveria a comunicação do aluno em
							sala?
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva como o aluno se comunica em sala de aula..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.nivelComunicacaoVerbal"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Qual o nível de comunicação verbal?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-verbal"
										id="nao-verbal"
									/>
									<Label htmlFor="nao-verbal">
										Não verbal
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="palavras-isoladas"
										id="palavras-isoladas"
									/>
									<Label htmlFor="palavras-isoladas">
										Palavras isoladas
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="frases-2-3"
										id="frases-2-3"
									/>
									<Label htmlFor="frases-2-3">
										Frases de 2-3 palavras
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="conversacao-simples"
										id="conversacao-simples"
									/>
									<Label htmlFor="conversacao-simples">
										Conversação simples
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="conversacao-complexa"
										id="conversacao-complexa"
									/>
									<Label htmlFor="conversacao-complexa">
										Conversação complexa
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
				name="step2.fazPedidos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							A criança consegue fazer pedidos?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-faz"
										id="nao-faz-pedidos"
									/>
									<Label htmlFor="nao-faz-pedidos">
										Não faz pedidos
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="gestos-choro"
										id="gestos-choro"
									/>
									<Label htmlFor="gestos-choro">
										Apenas por gestos/choro
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="palavras-ocasionais"
										id="palavras-ocasionais"
									/>
									<Label htmlFor="palavras-ocasionais">
										Palavras/símbolos ocasionais
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="pedidos-consistentes"
										id="pedidos-consistentes"
									/>
									<Label htmlFor="pedidos-consistentes">
										Pedidos consistentes
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="pedidos-elaborados"
										id="pedidos-elaborados"
									/>
									<Label htmlFor="pedidos-elaborados">
										Pedidos elaborados
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
