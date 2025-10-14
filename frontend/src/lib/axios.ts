import { AUTH_TOKEN_NAME, BASE_API_URL } from "@/constants";
import { getCookie } from "@/utils/cookie-store";
import axios from "axios";

const instance = axios.create({
	baseURL: BASE_API_URL,
});

instance.interceptors.request.use(async (cfg) => {
	const authToken = await getCookie(AUTH_TOKEN_NAME);

	if (!authToken) return cfg;

	cfg.headers.Authorization = `Bearer ${authToken}`;

	return cfg;
});

export { instance as api };
