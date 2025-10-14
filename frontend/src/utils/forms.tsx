import React from "react";

// Tipos para os campos do formulário
export type FieldType = "text" | "select" | "checkbox" | "radio" | "textarea";

interface SelectOption {
	value: string;
	label: string;
}

interface BaseField {
	id: string;
	label: string;
	required?: boolean;
	width?: "full" | "half" | "third";
}

interface TextField extends BaseField {
	type: "text" | "textarea";
	placeholder?: string;
}

interface SelectField extends BaseField {
	type: "select";
	options: SelectOption[];
	placeholder?: string;
}

interface CheckboxField extends BaseField {
	type: "checkbox";
	options: SelectOption[];
}

interface RadioField extends BaseField {
	type: "radio";
	options: SelectOption[];
}

type FormField = TextField | SelectField | CheckboxField | RadioField;

interface FormSection {
	title: string;
	subtitle?: string;
	fields: FormField[];
}

interface PrintableFormConfig {
	title: string;
	subtitle?: string;
	sections: FormSection[];
	showPrintDate?: boolean;
	customStyles?: string;
}

// Função principal para gerar formulários imprimíveis
export const generatePrintableForm = (
	config: PrintableFormConfig
): React.FC => {
	// eslint-disable-next-line
	return () => {
		const renderField = (field: FormField) => {
			const widthClass =
				field.width === "half"
					? "print-field-half"
					: field.width === "third"
					? "print-field-third"
					: "print-field-full";

			switch (field.type) {
				case "text":
				case "textarea":
					return (
						<div
							key={field.id}
							className={`print-field ${widthClass}`}
						>
							<div className="print-label">
								{field.label}
								{field.required ? " *" : ""}:
							</div>
							<div
								className={`print-value ${
									field.type === "textarea"
										? "print-textarea"
										: ""
								}`}
							></div>
						</div>
					);

				case "select":
					return (
						<div
							key={field.id}
							className={`print-field ${widthClass}`}
						>
							<div className="print-label">
								{field.label}
								{field.required ? " *" : ""}:
							</div>
							<div className="print-select">
								{field.options.map((option, index) => (
									<span
										key={option.value}
										className="print-select-option"
									>
										<span className="print-checkbox">
											☐
										</span>{" "}
										{option.label}
										{index < field.options.length - 1 && (
											<span className="option-separator">
												{" "}
												|{" "}
											</span>
										)}
									</span>
								))}
							</div>
						</div>
					);

				case "checkbox":
					return (
						<div
							key={field.id}
							className={`print-field ${widthClass}`}
						>
							<div className="print-label">
								{field.label}
								{field.required ? " *" : ""}:
							</div>
							<div className="print-checkbox-group">
								{field.options.map((option) => (
									<div
										key={option.value}
										className="print-checkbox-item"
									>
										<span className="print-checkbox">
											☐
										</span>{" "}
										{option.label}
									</div>
								))}
							</div>
						</div>
					);

				case "radio":
					return (
						<div
							key={field.id}
							className={`print-field ${widthClass}`}
						>
							<div className="print-label">
								{field.label}
								{field.required ? " *" : ""}:
							</div>
							<div className="print-radio-group">
								{field.options.map((option) => (
									<div
										key={option.value}
										className="print-radio-item"
									>
										<span className="print-radio">○</span>{" "}
										{option.label}
									</div>
								))}
							</div>
						</div>
					);

				default:
					return null;
			}
		};

		const groupFieldsByRow = (fields: FormField[]) => {
			const rows: FormField[][] = [];
			let currentRow: FormField[] = [];
			let currentRowWidth = 0;

			fields.forEach((field) => {
				const fieldWidth =
					field.width === "half"
						? 0.5
						: field.width === "third"
						? 0.33
						: 1;

				if (currentRowWidth + fieldWidth > 1) {
					if (currentRow.length > 0) {
						rows.push([...currentRow]);
						currentRow = [];
						currentRowWidth = 0;
					}
				}

				currentRow.push(field);
				currentRowWidth += fieldWidth;

				if (currentRowWidth >= 1) {
					rows.push([...currentRow]);
					currentRow = [];
					currentRowWidth = 0;
				}
			});

			if (currentRow.length > 0) {
				rows.push(currentRow);
			}

			return rows;
		};

		return (
			<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
				<style>
					{`
            @media print {
              body { margin: 0; font-size: 12pt; }
              .print-header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 2px solid #000; 
                padding-bottom: 10px; 
              }
              .print-section {
                margin-bottom: 30px;
              }
              .print-section-title {
                font-size: 16pt;
                font-weight: bold;
                margin-bottom: 5px;
                border-bottom: 1px solid #333;
                padding-bottom: 5px;
              }
              .print-section-subtitle {
                font-size: 10pt;
                color: #666;
                margin-bottom: 15px;
                font-style: italic;
              }
              .print-field { 
                margin-bottom: 15px; 
                display: flex; 
                flex-direction: column;
              }
              .print-field-full {
                width: 100%;
              }
              .print-field-half {
                width: 48%;
              }
              .print-field-third {
                width: 31%;
              }
              .print-label { 
                font-weight: bold; 
                margin-bottom: 5px; 
                font-size: 10pt;
              }
              .print-value { 
                border-bottom: 1px solid #000; 
                min-height: 20px; 
                padding: 2px 0;
              }
              .print-textarea {
                min-height: 60px;
              }
              .print-row { 
                display: flex; 
                gap: 20px; 
                margin-bottom: 15px;
                align-items: flex-start;
              }
              .print-select {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                padding: 5px 0;
              }
              .print-select-option {
                display: inline-flex;
                align-items: center;
                gap: 5px;
              }
              .print-checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 5px 0;
              }
              .print-checkbox-item {
                display: flex;
                align-items: center;
                gap: 8px;
              }
              .print-radio-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                padding: 5px 0;
              }
              .print-radio-item {
                display: flex;
                align-items: center;
                gap: 5px;
              }
              .print-checkbox, .print-radio {
                font-size: 12pt;
                font-weight: bold;
              }
              .option-separator {
                margin: 0 5px;
                color: #999;
              }
              .print-footer {
                margin-top: 40px;
                text-align: center;
                font-size: 10pt;
                color: #666;
                border-top: 1px solid #ccc;
                padding-top: 10px;
              }
            }
            @media screen {
              .print-field-half {
                width: 48%;
              }
              .print-field-third {
                width: 31%;
              }
            }
            ${config.customStyles || ""}
          `}
				</style>

				<div className="print-header">
					<h1 style={{ fontSize: "24px", margin: "0 0 10px 0" }}>
						{config.title}
					</h1>
					{config.subtitle && (
						<p
							style={{
								fontSize: "14px",
								color: "#666",
								margin: 0,
							}}
						>
							{config.subtitle}
						</p>
					)}
				</div>

				{config.sections.map((section, sectionIndex) => (
					<div key={sectionIndex} className="print-section">
						<div className="print-section-title">
							{section.title}
						</div>
						{section.subtitle && (
							<div className="print-section-subtitle">
								{section.subtitle}
							</div>
						)}

						{groupFieldsByRow(section.fields).map(
							(row, rowIndex) => (
								<div key={rowIndex} className="print-row">
									{row.map(renderField)}
								</div>
							)
						)}
					</div>
				))}

				{config.showPrintDate !== false && (
					<div className="print-footer">
						Formulário impresso em:{" "}
						{new Date().toLocaleDateString("pt-BR")} às{" "}
						{new Date().toLocaleTimeString("pt-BR")} criado por{" "}
						<a
							href="https://www.pontopei.com.br"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500"
						>
							www.pontopei.com.br
						</a>
					</div>
				)}
			</div>
		);
	};
};
