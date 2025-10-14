"use client";

import { AuthApi } from "@/api/auth.api";
import { SignInFormData } from "@/components/auth/forms/SignInForm";
import { AUTH_TOKEN_NAME } from "@/constants";
import { api } from "@/lib/axios";
import { User } from "@/models/interfaces/user/user.interface";
import { delCookie, getCookie, setCookie } from "@/utils/cookie-store";
import { useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";

interface AuthContextProps {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	signIn: (data: SignInFormData) => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const signOut = useCallback(async () => {
		await delCookie(AUTH_TOKEN_NAME);
		router.push("/auth");
	}, [router]);

	const recoverUser = useCallback(async () => {
		try {
			const authToken = await getCookie(AUTH_TOKEN_NAME);

			if (!authToken) return;

			const data = await AuthApi.findUserByToken(authToken);

			setUser(data);
			router.refresh();
			// eslint-disable-next-line
		} catch (error) {
			await signOut();

			toast.error("Erro ao recuperar usuário.", {
				description:
					"Para sua segurança você sera desconectado. Tente realizar o login novamente.",
			});
		}
	}, [signOut, router]);

	useEffect(() => {
		recoverUser();
	}, [recoverUser]);

	async function signIn(data: SignInFormData) {
		const req = await api.post("/auth/sign-in", data);
		const userAndToken = req.data;

		const { user, token } = userAndToken;
		setUser(user);

		await setCookie(AUTH_TOKEN_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	return (
		<AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => useContext(AuthContext);
