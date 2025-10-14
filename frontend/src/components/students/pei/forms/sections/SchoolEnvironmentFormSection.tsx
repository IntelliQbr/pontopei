"use client";

import { Checkbox } from "@/components/ui/checkbox";
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

export function SchoolEnvironmentFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Ambiente Escolar
			</h3>

			<FormField
				control={form.control}
				name="step2.movimentacaoSala"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Como é a movimentação do aluno na sala de aula?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sempre-sentado"
										id="mov-sentado"
									/>
									<Label htmlFor="mov-sentado">
										Permanece sempre sentado
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="levanta-dificuldade"
										id="mov-dificuldade"
									/>
									<Label htmlFor="mov-dificuldade">
										Levanta-se com dificuldade
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="caminha-normal"
										id="mov-normal"
									/>
									<Label htmlFor="mov-normal">
										Caminha normalmente
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="corre-sala"
										id="mov-corre"
									/>
									<Label htmlFor="mov-corre">
										Corre pela sala
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="movimenta-cuidado"
										id="mov-cuidado"
									/>
									<Label htmlFor="mov-cuidado">
										Movimenta-se com cuidado
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
				name="step2.educacaoFisica"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Participação nas aulas de Educação Física:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-participa"
										id="ef-nao"
									/>
									<Label htmlFor="ef-nao">
										Não participa
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="participa-ajuda"
										id="ef-ajuda"
									/>
									<Label htmlFor="ef-ajuda">
										Participa com ajuda
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="algumas-atividades"
										id="ef-algumas"
									/>
									<Label htmlFor="ef-algumas">
										Participa de algumas atividades
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="todas-atividades"
										id="ef-todas"
									/>
									<Label htmlFor="ef-todas">
										Participa de todas as atividades
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="se-destaca"
										id="ef-destaca"
									/>
									<Label htmlFor="ef-destaca">
										Se destaca nas atividades
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
				name="step2.participaAtividadesGrupo"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Participa de atividades em grupo?
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
										id="grupo-sim"
									/>
									<Label htmlFor="grupo-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="grupo-nao"
									/>
									<Label htmlFor="grupo-nao">Não</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="com-suporte"
										id="grupo-suporte"
									/>
									<Label htmlFor="grupo-suporte">
										Com suporte
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
				name="step2.possuiMateriaisAdaptados"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Possui materiais pedagógicos adaptados?
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
										id="materiais-sim"
									/>
									<Label htmlFor="materiais-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="materiais-nao"
									/>
									<Label htmlFor="materiais-nao">Não</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="poucos-recursos"
										id="materiais-poucos"
									/>
									<Label htmlFor="materiais-poucos">
										Poucos recursos
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
				name="step2.recursosSala"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Recursos disponíveis na sala de aula:
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Rotina visual",
								"Cantinho da calma",
								"Mobiliário adaptado",
								"Recursos de comunicação alternativa",
								"Outros",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step2.recursosSala"
									render={({ field }) => {
										return (
											<FormItem
												key={item}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														disabled={
															field.disabled
														}
														checked={field.value?.includes(
															item
														)}
														onCheckedChange={(
															checked
														) => {
															return checked
																? field.onChange(
																		[
																			...field.value,
																			item,
																		]
																  )
																: field.onChange(
																		field.value?.filter(
																			(
																				value
																			) =>
																				value !==
																				item
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{item}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.estruturaEscola"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							A estrutura da escola é acessível?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="acessivel-adaptada"
										id="escola-acessivel"
									/>
									<Label htmlFor="escola-acessivel">
										Sim, totalmente acessível e adaptada
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="parcialmente-adaptada"
										id="escola-parcial"
									/>
									<Label htmlFor="escola-parcial">
										Parcialmente adaptada
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao-adaptada"
										id="escola-nao-adaptada"
									/>
									<Label htmlFor="escola-nao-adaptada">
										Não adaptada
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
