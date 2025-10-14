import MarkdownPreview from "@uiw/react-markdown-preview";
import React from "react";

// Interfaces para configuração do documento
interface DocumentHeader {
	title: string;
	subtitle?: string;
	leftInfo?: { label: string; value: string }[];
	rightInfo?: { label: string; value: string }[];
	centerInfo?: { label: string; value: string }[];
}

interface DocumentFooter {
	leftText?: string;
	centerText?: string;
	rightText?: string;
	showPageNumber?: boolean;
	disclaimer?: string;
}

interface DocumentMetadata {
	createdAt?: Date;
	author?: string;
	version?: string;
	generatedBy?: string;
	documentType?: string;
}

interface PrintableDocumentConfig {
	header: DocumentHeader;
	content: string; // Markdown content
	footer?: DocumentFooter;
	metadata?: DocumentMetadata;
	pageStyle?: {
		maxWidth?: string;
		padding?: string;
		fontFamily?: string;
		fontSize?: string;
		lineHeight?: string;
	};
	markdownStyles?: {
		backgroundColor?: string;
		color?: string;
		customCSS?: string;
	};
}

// Componente para renderizar o cabeçalho
const DocumentHeaderComponent: React.FC<{ header: DocumentHeader }> = ({
	header,
}) => {
	const { title, subtitle, leftInfo, rightInfo, centerInfo } = header;

	return (
		<div className="border-b-2 border-gray-300 pb-4 mb-6">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-2">
					{title.toUpperCase()}
				</h1>
				{subtitle && (
					<h2 className="text-lg text-gray-600 mb-4">{subtitle}</h2>
				)}
				{(leftInfo || rightInfo || centerInfo) && (
					<div className="flex justify-between items-center text-sm text-gray-600">
						<div className="text-left">
							{leftInfo?.map((info, index) => (
								<div key={index}>
									<span className="font-semibold">
										{info.label}:
									</span>{" "}
									{info.value}
								</div>
							))}
						</div>
						<div className="text-center">
							{centerInfo?.map((info, index) => (
								<div key={index}>
									<span className="font-semibold">
										{info.label}:
									</span>{" "}
									{info.value}
								</div>
							))}
						</div>
						<div className="text-right">
							{rightInfo?.map((info, index) => (
								<div key={index}>
									<span className="font-semibold">
										{info.label}:
									</span>{" "}
									{info.value}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// Componente para renderizar metadados
const DocumentMetadataComponent: React.FC<{ metadata: DocumentMetadata }> = ({
	metadata,
}) => {
	const { createdAt, author, version, generatedBy, documentType } = metadata;

	return (
		<div className="mb-6">
			<div className="flex justify-between text-xs text-gray-500">
				<div className="space-y-1">
					{createdAt && (
						<div>
							<span className="font-semibold">
								Data de criação:
							</span>{" "}
							{createdAt.toLocaleDateString()}
						</div>
					)}
					{author && (
						<div>
							<span className="font-semibold">Autor:</span>{" "}
							{author}
						</div>
					)}
					{documentType && (
						<div>
							<span className="font-semibold">Tipo:</span>{" "}
							{documentType}
						</div>
					)}
				</div>
				<div className="space-y-1 text-right">
					{version && (
						<div>
							<span className="font-semibold">Versão:</span>{" "}
							{version}
						</div>
					)}
					{generatedBy && (
						<div>
							<span className="font-semibold">Gerado por:</span>{" "}
							{generatedBy}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// Componente para renderizar o conteúdo
const DocumentContentComponent: React.FC<{
	content: string;
	styles: { backgroundColor: string; color: string };
}> = ({ content, styles }) => {
	return (
		<div className="prose prose-sm max-w-none">
			<div>
				<MarkdownPreview
					source={content}
					style={{
						backgroundColor: styles.backgroundColor,
						color: styles.color,
						padding: "0",
						fontFamily: "inherit",
						fontSize: "inherit",
						lineHeight: "inherit",
					}}
					data-color-mode="light"
				/>
			</div>
		</div>
	);
};

// Componente para renderizar o rodapé
const DocumentFooterComponent: React.FC<{ footer: DocumentFooter }> = ({
	footer,
}) => {
	const { leftText, centerText, rightText, showPageNumber, disclaimer } =
		footer;

	const rightContent = showPageNumber
		? rightText
			? `${rightText} | Página 1 de 1`
			: "Página 1 de 1"
		: rightText;

	return (
		<div className="mt-8 pt-4 border-t border-gray-200">
			{disclaimer && (
				<div className="text-xs text-gray-500 mb-2 text-center italic">
					{disclaimer}
				</div>
			)}
			<div className="flex justify-between items-center text-xs text-gray-500">
				<div>{leftText || ""}</div>
				{centerText && <div className="text-center">{centerText}</div>}
				<div>{rightContent || ""}</div>
			</div>
			<div className="text-center mt-10 text-sm">
				Criado por{" "}
				<a
					href="https://www.pontopei.com.br"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500"
				>
					www.pontopei.com.br
				</a>
			</div>
		</div>
	);
};

// Componente para estilos de impressão

const PrintStyles: React.FC<{
	pageStyle: {
		fontFamily: string;
		fontSize: string;
		lineHeight: string;
	};
}> = ({ pageStyle }) => {
	return (
		<style jsx>{`
			@media print {
				* {
					-webkit-print-color-adjust: exact !important;
					color-adjust: exact !important;
				}

				body {
					font-family: ${pageStyle.fontFamily};
					font-size: ${pageStyle.fontSize};
					line-height: ${pageStyle.lineHeight};
				}

				.prose h1,
				.prose h2,
				.prose h3,
				.prose h4,
				.prose h5,
				.prose h6 {
					color: #1f2937 !important;
					font-weight: bold;
					margin-top: 1.5em;
					margin-bottom: 0.5em;
					page-break-after: avoid;
				}

				.prose h1 {
					font-size: 1.5em;
				}
				.prose h2 {
					font-size: 1.3em;
				}
				.prose h3 {
					font-size: 1.1em;
				}

				.prose p {
					margin-bottom: 1em;
					color: #374151 !important;
					orphans: 3;
					widows: 3;
				}

				.prose ul,
				.prose ol {
					margin: 1em 0;
					padding-left: 1.5em;
					page-break-inside: avoid;
				}

				.prose li {
					margin-bottom: 0.5em;
					color: #374151 !important;
				}

				.prose strong {
					font-weight: bold;
					color: #1f2937 !important;
				}

				.prose em {
					font-style: italic;
				}

				.prose code {
					background-color: #f3f4f6 !important;
					padding: 2px 4px;
					border-radius: 3px;
					font-family: monospace;
					font-size: 0.9em;
				}

				.prose pre {
					background-color: #f9fafb !important;
					padding: 1em;
					border-radius: 0.5em;
					overflow-x: auto;
					page-break-inside: avoid;
				}

				.prose blockquote {
					border-left: 4px solid #d1d5db;
					padding-left: 1em;
					margin: 1em 0;
					font-style: italic;
					color: #6b7280 !important;
					page-break-inside: avoid;
				}

				.prose table {
					width: 100%;
					border-collapse: collapse;
					margin: 1em 0;
					page-break-inside: avoid;
				}

				.prose th,
				.prose td {
					border: 1px solid #d1d5db;
					padding: 8px 12px;
					text-align: left;
				}

				.prose th {
					background-color: #f9fafb !important;
					font-weight: bold;
				}

				.prose hr {
					border: none;
					border-top: 1px solid #d1d5db;
					margin: 2em 0;
				}

				/* Quebras de página */
				.page-break {
					page-break-before: always;
				}

				.no-break {
					page-break-inside: avoid;
				}

				/* Ocultar elementos desnecessários na impressão */
				.no-print {
					display: none !important;
				}
			}
		`}</style>
	);
};

// Função principal que retorna um Functional Component
export function generatePrintableDocument(
	config: PrintableDocumentConfig
): React.FC {
	const {
		header,
		content,
		footer,
		metadata,
		pageStyle = {},
		markdownStyles = {},
	} = config;

	// Configurações padrão
	const defaultPageStyle = {
		maxWidth: "4xl",
		padding: "8",
		fontFamily: "system-ui, -apple-system, sans-serif",
		fontSize: "14px",
		lineHeight: "1.6",
		...pageStyle,
	};

	const defaultMarkdownStyles = {
		backgroundColor: "transparent",
		color: "#374151",
		...markdownStyles,
	};

	// Retorna o Functional Component
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	const PrintableDocumentComponent: React.FC<{}> = () => {
		return (
			<div
				className={`p-${defaultPageStyle.padding} max-w-${defaultPageStyle.maxWidth} mx-auto bg-white text-black`}
			>
				<DocumentHeaderComponent header={header} />
				{metadata && <DocumentMetadataComponent metadata={metadata} />}
				<DocumentContentComponent
					content={content}
					styles={defaultMarkdownStyles}
				/>
				{footer && <DocumentFooterComponent footer={footer} />}
				<PrintStyles pageStyle={defaultPageStyle} />
			</div>
		);
	};

	return PrintableDocumentComponent;
}

// Função de conveniência para o WeeklyPlan que retorna um FC
export function generateWeeklyPlanPrintable(
	weeklyPlan: {
		content: string;
		weekStart: string;
		weekEnd: string;
		createdAt: string;
	},
	student: { fullName: string }
): React.FC {
	const config: PrintableDocumentConfig = {
		header: {
			title: "Plano Semanal",
			leftInfo: [{ label: "Aluno", value: student.fullName }],
			rightInfo: [
				{
					label: "Período",
					value: `${new Date(
						weeklyPlan.weekStart
					).toLocaleDateString()} - ${new Date(
						weeklyPlan.weekEnd
					).toLocaleDateString()}`,
				},
			],
		},
		content: weeklyPlan.content,
		metadata: {
			createdAt: new Date(weeklyPlan.createdAt),
			generatedBy: "IA",
			documentType: "Plano Educacional",
		},
		footer: {
			leftText:
				"Este plano foi gerado automaticamente e deve ser revisado pelo professor responsável.",
			showPageNumber: true,
			disclaimer:
				"Documento gerado por sistema automatizado: www.pontopei.com.br",
		},
	};

	return generatePrintableDocument(config);
}
