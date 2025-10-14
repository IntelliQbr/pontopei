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

export function SensoryIssuesFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Questões Sensoriais e Comportamentais
			</h3>

			{/* Questões Sensoriais */}
			<FormField
				control={form.control}
				name="step4.reacaoRuidos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Reação a ruídos altos:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-incomoda",
										label: "Não se incomoda",
									},
									{
										value: "pouco-desconfortavel",
										label: "Pouco desconfortável",
									},
									{
										value: "muito-incomodado",
										label: "Muito incomodado",
									},
									{
										value: "tapa-ouvidos",
										label: "Tapa os ouvidos",
									},
									{
										value: "crise-choro",
										label: "Entra em crise/chora",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`ruidos-${value}`}
										/>
										<Label htmlFor={`ruidos-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.reacaoTexturas"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Reação a texturas:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "explora-normal",
										label: "Explora normalmente",
									},
									{
										value: "pouca-hesitacao",
										label: "Com pouca hesitação",
									},
									{
										value: "evita-certas",
										label: "Evita certas texturas",
									},
									{
										value: "recusa-maioria",
										label: "Recusa a maioria",
									},
									{
										value: "nao-toca",
										label: "Não toca em nada novo",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`texturas-${value}`}
										/>
										<Label htmlFor={`texturas-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.reacaoLuz"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Reação à luz forte:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-incomoda",
										label: "Não se incomoda",
									},
									{
										value: "pisca-olhos",
										label: "Pisca os olhos",
									},
									{ value: "evita-luz", label: "Evita" },
									{
										value: "fecha-olhos",
										label: "Fecha os olhos",
									},
									{
										value: "agitado-luz",
										label: "Fica agitado",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`luz-${value}`}
										/>
										<Label htmlFor={`luz-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.gostaContato"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Gosta de contato físico?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "gosta-muito",
										label: "Gosta muito",
									},
									{
										value: "gosta-as-vezes",
										label: "Gosta às vezes",
									},
									{
										value: "indiferente",
										label: "Indiferente",
									},
									{
										value: "evita-contato",
										label: "Evita",
									},
									{
										value: "rejeita-completamente",
										label: "Rejeita completamente",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`contato-${value}`}
										/>
										<Label htmlFor={`contato-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.reacaoBarulhosCasa"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Reação a barulhos em casa:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-incomoda",
										label: "Não se incomoda",
									},
									{
										value: "pouco-desconfortavel",
										label: "Pouco desconfortável",
									},
									{
										value: "muito-incomodado",
										label: "Muito incomodado",
									},
									{
										value: "outro-comodo",
										label: "Vai para outro cômodo",
									},
									{
										value: "crise-choro",
										label: "Entra em crise/chora",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`barulho-casa-${value}`}
										/>
										<Label
											htmlFor={`barulho-casa-${value}`}
										>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.gostaBanho"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Como reage ao banho?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{ value: "adora", label: "Adora" },
									{ value: "gosta", label: "Gosta" },
									{
										value: "indiferente",
										label: "Indiferente",
									},
									{
										value: "nao-gosta",
										label: "Não gosta",
									},
									{ value: "odeia", label: "Odeia" },
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`banho-${value}`}
										/>
										<Label htmlFor={`banho-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.prefereRoupas"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Preferência por roupas:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-preferencia",
										label: "Sem preferência",
									},
									{
										value: "macias-confortaveis",
										label: "Macias e confortáveis",
									},
									{
										value: "largas-folgadas",
										label: "Largas e folgadas",
									},
									{
										value: "justas-apertadas",
										label: "Justas e apertadas",
									},
									{
										value: "sempre-mesmas",
										label: "Sempre as mesmas peças",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`roupas-${value}`}
										/>
										<Label htmlFor={`roupas-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Comunicação e Linguagem */}
			<h4 className="text-md font-medium border-b pb-1 mt-8">
				Comunicação e Linguagem
			</h4>
			<FormField
				control={form.control}
				name="step4.nomeiaObjetos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Nomeia objetos e ações:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-nomeia",
										label: "Não nomeia",
									},
									{
										value: "alguns-familiares",
										label: "Alguns objetos familiares",
									},
									{
										value: "objetos-acoes-basicas",
										label: "Objetos e ações básicas",
									},
									{
										value: "vocabulario-amplo",
										label: "Vocabulário amplo",
									},
									{
										value: "descreve-detalhadamente",
										label: "Descreve detalhadamente",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`nomeia-${value}`}
										/>
										<Label htmlFor={`nomeia-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.repetePalavras"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Repete palavras ou frases:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-repete",
										label: "Não repete",
									},
									{
										value: "sons-simples",
										label: "Sons simples",
									},
									{
										value: "repete-palavras",
										label: "Repete palavras",
									},
									{
										value: "repete-frases",
										label: "Repete frases",
									},
									{
										value: "ecoico-funcional",
										label: "Ecoico funcional",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`repete-${value}`}
										/>
										<Label htmlFor={`repete-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Comportamento e Adaptabilidade */}
			<h4 className="text-md font-medium border-b pb-1 mt-8">
				Comportamento e Adaptabilidade
			</h4>
			<FormField
				control={form.control}
				name="step4.aceitacaoMudancas"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Aceitação de mudanças:</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "muito-dificil",
										label: "Muito difícil",
									},
									{
										value: "dificil",
										label: "Difícil",
									},
									{
										value: "aceita-apoio",
										label: "Aceita com apoio",
									},
									{
										value: "adapta-bem",
										label: "Adapta-se bem",
									},
									{
										value: "flexivel",
										label: "Muito flexível",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`mudancas-${value}`}
										/>
										<Label htmlFor={`mudancas-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.comportamentoCrise"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Apresenta comportamento de crise?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{ value: "sim", label: "Sim" },
									{ value: "nao", label: "Não" },
									{ value: "as-vezes", label: "Às vezes" },
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`crise-${value}`}
										/>
										<Label htmlFor={`crise-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.comportamentosRepetitivos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Comportamentos repetitivos:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "frequentes-intensos",
										label: "Frequentes e intensos",
									},
									{
										value: "moderados",
										label: "Moderados",
									},
									{
										value: "ocasionalmente",
										label: "Ocasionalmente",
									},
									{
										value: "raramente",
										label: "Raramente",
									},
									{
										value: "nao-apresenta",
										label: "Não apresenta",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`repetitivos-${value}`}
										/>
										<Label htmlFor={`repetitivos-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Socialização e Brincadeiras */}
			<h4 className="text-md font-medium border-b pb-1 mt-8">
				Socialização e Brincadeiras
			</h4>
			<FormField
				control={form.control}
				name="step4.interesseBrincadeiras"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Interesse em brincadeiras:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "brinca-sozinho",
										label: "Brinca sozinho",
									},
									{
										value: "brinca-irmaos",
										label: "Brinca com irmãos",
									},
									{
										value: "evita-brincadeiras",
										label: "Evita brincadeiras",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`brincadeiras-${value}`}
										/>
										<Label
											htmlFor={`brincadeiras-${value}`}
										>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.habilidadesSociaisCasa"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Habilidades sociais em casa:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-interage",
										label: "Não interage",
									},
									{
										value: "interage-familiares",
										label: "Interage com familiares",
									},
									{
										value: "demonstra-afeto",
										label: "Demonstra afeto",
									},
									{
										value: "brinca-junto",
										label: "Brinca junto",
									},
									{
										value: "inicia-interacoes",
										label: "Inicia interações",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`sociais-${value}`}
										/>
										<Label htmlFor={`sociais-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.conceitosBasicos"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Conceitos básicos que domina:
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Cores",
								"Formas",
								"Números",
								"Letras",
								"Grande/pequeno",
								"Dentro/fora",
								"Nenhum",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step4.conceitosBasicos"
									render={({ field }) => (
										<FormItem
											key={item}
											className="flex flex-row items-start space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													disabled={field.disabled}
													checked={field.value?.includes(
														item
													)}
													onCheckedChange={(
														checked
													) => {
														return checked
															? field.onChange([
																	...field.value,
																	item,
															  ])
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
									)}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
