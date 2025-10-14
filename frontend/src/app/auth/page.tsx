import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Autenticação",
};

export default function Page() {
	permanentRedirect("/auth/sign-in");
}
