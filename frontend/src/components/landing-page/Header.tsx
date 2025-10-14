import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Brain, Crown, Menu, Target, Users } from "lucide-react";
import Link from "next/link";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
	return (
		<Link
			href={href}
			className={`text-sm font-medium transition-colors hover:text-primary ${
				isActive ? "text-primary" : ""
			}`}
		>
			{children}
		</Link>
	);
}

interface MobileNavLinkProps {
	href: string;
	icon: React.ElementType;
	children: React.ReactNode;
	isActive?: boolean;
}

function MobileNavLink({
	href,
	icon: Icon,
	children,
	isActive,
}: MobileNavLinkProps) {
	return (
		<Link
			href={href}
			className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
				isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/10"
			}`}
		>
			<div
				className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
					isActive
						? "bg-primary/20"
						: "bg-primary/10 group-hover:bg-primary/20"
				}`}
			>
				<Icon className="h-4 w-4 text-primary" />
			</div>
			<span className="text-lg font-medium hover:text-primary transition-colors">
				{children}
			</span>
		</Link>
	);
}

interface HeaderProps {
	activeLink?: "about" | "how-it-works" | "benefits" | "pricing";
}

export function Header({ activeLink }: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Logo />

				<nav className="hidden items-center space-x-6 md:flex">
					<NavLink href="/about" isActive={activeLink === "about"}>
						Sobre
					</NavLink>
					<NavLink
						href="/how-it-works"
						isActive={activeLink === "how-it-works"}
					>
						Como Funciona
					</NavLink>
					<NavLink
						href="/benefits"
						isActive={activeLink === "benefits"}
					>
						Benefícios
					</NavLink>
					<NavLink
						href="/#precos"
						isActive={activeLink === "pricing"}
					>
						Preços
					</NavLink>
				</nav>

				<div className="flex items-center space-x-4">
					<Button className="hidden md:inline-flex" asChild>
						<Link href="/dashboard">Começar Agora</Link>
					</Button>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[300px]  sm:w-[400px]"
						>
							<SheetTitle className="p-4">
								<Logo />
							</SheetTitle>
							<div className="flex h-full flex-col">
								<nav className="flex flex-1 flex-col space-y-2 py-6">
									<MobileNavLink
										href="/about"
										icon={Users}
										isActive={activeLink === "about"}
									>
										Sobre
									</MobileNavLink>
									<MobileNavLink
										href="/how-it-works"
										icon={Brain}
										isActive={activeLink === "how-it-works"}
									>
										Como Funciona
									</MobileNavLink>
									<MobileNavLink
										href="/benefits"
										icon={Target}
										isActive={activeLink === "benefits"}
									>
										Benefícios
									</MobileNavLink>
									<MobileNavLink
										href="/#precos"
										icon={Crown}
										isActive={activeLink === "pricing"}
									>
										Preços
									</MobileNavLink>
								</nav>

								<div className="space-y-4 border-t border-primary/20 pt-6 flex justify-center">
									<Button
										className="w-[80%] h-12 mb-5 py-3 text-lg transition-transform hover:scale-105"
										asChild
									>
										<Link href="/dashboard">
											Começar Agora
										</Link>
									</Button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
