import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Política de Privacidade e Proteção de Dados",
};

export default function TermsPage() {
	return (
		<div className="flex border border-primary flex-col gap-5 items-center max-w-4xl w-full mx-auto my-10 bg-background/50 backdrop-blur-xl p-10 rounded-lg shadow-lg">
			<H1 className="text-2xl font-bold">
				Política de Privacidade e Proteção de Dados – Plataforma Ponto
				PEI
			</H1>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">1. Quem somos?</H2>
				<p>
					A Plataforma Ponto PEI é um sistema inteligente de apoio ao
					Atendimento Educacional Especializado (AEE), voltado para
					escolas, professores e equipes pedagógicas que desejam
					elaborar, revisar e aplicar Planos Educacionais
					Individualizados (PEI) com o suporte de Inteligência
					Artificial.
				</p>
				<p>
					Nos comprometemos com a proteção da privacidade e dos dados
					pessoais e sensíveis dos usuários da plataforma.
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">2. Quais dados coletamos</H2>
				<p>
					Durante o uso da plataforma, coletamos os seguintes dados:
				</p>
				<ol className="list-decimal list-inside">
					<li>
						<span className="font-semibold">
							Dados de identificação:
						</span>
						<ul className="ml-4 list-disc list-inside">
							<li>
								Nome do aluno, idade, escola, turma e período
							</li>
							<li>
								Nome, e-mail e função dos professores e
								diretores cadastrados
							</li>
						</ul>
					</li>
					<li>
						<span className="font-semibold">Dados sensíveis:</span>
						<ul className="ml-4 list-disc list-inside">
							<li>
								Diagnóstico, CID (se houver), comportamentos
								observados
							</li>
							<li>Comunicação verbal ou alternativa</li>
							<li>
								Crises emocionais, estratégias de acolhimento,
								sensibilidades sensoriais
							</li>
							<li>
								Informações pedagógicas, como acompanhamento de
								conteúdo e dificuldades
							</li>
						</ul>
					</li>
					<li>
						<span className="font-semibold">Dados de acesso:</span>
						<ul className="ml-4 list-disc list-inside">
							<li>E-mail de login</li>
							<li>Histórico de uso da plataforma</li>
							<li>
								Endereço IP, navegador e sistema operacional
							</li>
						</ul>
					</li>
				</ol>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">3. Para que usamos os dados</H2>
				<p>
					Os dados coletados são usados para as seguintes finalidades:
				</p>
				<ul className="list-disc list-inside">
					<li>Gerar automaticamente PEIs personalizados</li>
					<li>
						Criar planos de aula adaptados com base nas necessidades
						dos alunos
					</li>
					<li>
						Manter um histórico pedagógico individual de cada aluno
					</li>
					<li>
						Permitir o acesso seguro e restrito à equipe escolar
						autorizada
					</li>
					<li>
						Apoiar a tomada de decisão pedagógica e o
						desenvolvimento de práticas inclusivas
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">4. Compartilhamento de dados</H2>
				<p>
					Seus dados não são vendidos, cedidos ou utilizados para fins
					comerciais externos.
				</p>
				<p>O acesso aos dados é restrito a:</p>
				<ul className="list-disc list-inside">
					<li>Professores autorizados da escola cadastrada</li>
					<li>Direção/coordenação da escola</li>
					<li>
						Equipe técnica da Plataforma Ponto PEI, apenas quando
						necessário
					</li>
					<li>
						A inteligência artificial da plataforma, em ambiente
						seguro e controlado
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">5. Direitos dos titulares de dados</H2>
				<p>Conforme a LGPD, você tem o direito de:</p>
				<ul className="list-disc list-inside">
					<li>Acessar seus dados</li>
					<li>Corrigir informações incorretas</li>
					<li>Solicitar a exclusão de seus dados da plataforma</li>
					<li>Retirar o consentimento de uso a qualquer momento</li>
				</ul>
				<p>Para exercer seus direitos, entre em contato pelo e-mail:</p>
				<p className="font-medium">📧 contato@pontopei.com.br</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">6. Segurança dos dados</H2>
				<p>
					Adotamos medidas técnicas e organizacionais para proteger
					seus dados, incluindo:
				</p>
				<ul className="list-disc list-inside">
					<li>Acesso com autenticação segura</li>
					<li>Criptografia dos dados sensíveis</li>
					<li>Registros de acesso com controle de logs</li>
					<li>Servidores com certificado SSL</li>
				</ul>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">
					7. Armazenamento e tempo de retenção
				</H2>
				<p>
					Os dados permanecem armazenados de forma segura pelo tempo
					necessário para cumprir sua finalidade educacional,
					respeitando prazos legais e pedagógicos.
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">8. Alterações nesta política</H2>
				<p>
					Podemos atualizar esta política para refletir melhorias e
					exigências legais. Sempre que isso acontecer, publicaremos a
					versão atualizada neste mesmo link.
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">9. Dados de pagamento</H2>
				<p>
					Os dados de pagamento (como número de cartão, dados
					bancários, etc.) não são armazenados em nossa plataforma.
				</p>
				<p>
					As transações financeiras são processadas por plataformas
					terceiras seguras (como Stripe, PayPal, PagSeguro ou
					similares), que seguem os mais altos padrões de segurança
					(PCI-DSS).
				</p>
				<p>
					A Ponto PEI não tem acesso direto nem armazena dados
					completos de cartão ou informações bancárias dos usuários.
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<H2 className="text-lg">Contato</H2>
				<p>
					Dúvidas, sugestões ou solicitações podem ser feitas pelo
					nosso canal de atendimento:
				</p>
				<p className="font-medium">📧 contato@pontopei.com.br</p>
				<p className="text-sm text-muted-foreground mt-4">
					Última atualização: 31/07/2025
				</p>
			</div>
		</div>
	);
}
