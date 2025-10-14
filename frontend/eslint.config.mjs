import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * Regra embutida: detecta comentários proibidos antes do deploy
 * (pode ajustar a regex/proc. conforme precisar)
 */
const removeBeforeDeployRule = {
    meta: {
        type: "problem",
        docs: {
            description: "Impede deploy quando comentários como REMOVE_BEFORE_DEPLOY, TODO ou FIXME ainda existem",
        },
        schema: [],
    },
    create(context) {
        const sourceCode = context.getSourceCode();
        return {
            Program() {
                const comments = sourceCode.getAllComments();
                for (const comment of comments) {
                    // ajuste a regex pra seus padrões; aqui detectamos REMOVE_BEFORE_DEPLOY, TODO, FIXME
                    if (/\b(REMOVE_BEFORE_DEPLOY|TODO|FIXME)\b/.test(comment.value)) {
                        // reporta no local do comentário
                        context.report({
                            loc: comment.loc,
                            message: `Comentário proibido encontrado: "${comment.value.trim()}" — remova/resolva antes do deploy.`,
                        });
                    }
                }
            },
        };
    },
};

export default [
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // bloco onde registramos a regra e ativamos
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        // registrando plugin 'custom' inline contendo a regra
        plugins: {
            custom: {
                rules: {
                    // nome interno da regra
                    "remove-before-deploy": removeBeforeDeployRule,
                },
            },
        },
        // ativando a regra com nível 'error'
        rules: {
            "custom/remove-before-deploy": "error",
        },
    },
];
