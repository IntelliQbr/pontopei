import { api } from "@/lib/axios";
import { User } from "@/models/interfaces/user/user.interface";

async function findUserByToken(token: string): Promise<User> {
	const req = await api.post("/auth/find-by-token", {
		token,
	});

	return req.data;
}

export const AuthApi = {
	findUserByToken,
};
