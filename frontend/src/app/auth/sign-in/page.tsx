import { SignInForm } from "@/components/auth/forms/SignInForm";
import { H2 } from "@/components/typography/H2";
import { Muted } from "@/components/typography/Muted";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Entrar",
};

export default function Page() {
	return (
		<div className="flex flex-col items-center gap-5">
			<div className="flex sm:flex-row flex-col-reverse gap-5 sm:gap-0 justify-center mt-20 px-2">
				<div className="flex flex-col gap-10 items-center py-10 max-w-xl  rounded-r-none w-full border-primary/50 border shadow-md p-5 rounded-lg bg-background/50 backdrop-blur-sm">
					<div className="self-stretch space-y-2">
						<H2 className="text-center text-4xl">Entrar</H2>
						<Muted className="text-center">
							Bem vindo(a) de volta ao{" "}
							<strong className="text-primary">Ponto PEI</strong>{" "}
							acesse sua conta!
						</Muted>
					</div>
					<SignInForm />
				</div>
				<div className="flex items-center bg-primary max-w-md rounded-xl rounded-l-none shadow-lg">
					<Image
						className="sm:h-[80%] sm:w-[80%] w-[30%] h-[30%] object-cover rounded-lg rounded-l-none border-8 border-l-0 border-background shadow-lg"
						src={"/images/sign-in-banner.jpg"}
						alt="auth-banner"
						width={600}
						height={300}
					/>
					<p className="block sm:hidden text-sm px-5 text-background italic font-semibold">
						&quot;Onde a tecnologia encontra a humanidade na
						educação que abraça a diversidade. Criamos pontes entre
						potenciais únicos.&quot;
					</p>
				</div>
			</div>
			<Link
				href={"/terms"}
				className="text-muted-foreground text-xs max-w-[400px] text-center"
			>
				Ao continuar, você concorda com nossos{" "}
				<strong className="text-primary underline">
					Termos e Condições de Serviço e Política de Privacidade
				</strong>
				.
			</Link>
		</div>
	);
}
