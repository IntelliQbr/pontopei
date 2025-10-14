import { Logo } from "@/components/shared/Logo";
import { RootLayoutProps } from "../layout";

export default function TermsLayout({ children }: RootLayoutProps) {
	return (
		<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-primary from-10% to-primary/5 to-20%">
			<Logo className="mt-10" />
			<main className="self-stretch mb-10">{children}</main>
		</div>
	);
}
