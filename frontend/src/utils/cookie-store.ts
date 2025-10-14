"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookie(key: string): Promise<string | undefined> {
	const cookieStore = await cookies();

	return cookieStore.get(key)?.value;
}

export async function setCookie(
	key: string,
	value: string,
	options?: Partial<ResponseCookie> | undefined
): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(key, value, options);
}

export async function delCookie(
	key: string,
	options?: Omit<ResponseCookie, "value" | "expires" | "name">
): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete({
		name: key,
		...options,
	});
}
