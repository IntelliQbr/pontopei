import { AuthApi } from "@/api/auth.api";
import { AUTH_TOKEN_NAME } from "@/constants";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { getCookie } from "@/utils/cookie-store";
import { NextRequest, NextResponse } from "next/server";

export async function authorization_onboarding(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (!pathname.startsWith("/onboarding")) {
		return false;
	}

	const authToken = await getCookie(AUTH_TOKEN_NAME);
	const origin = request.nextUrl.origin;

	if (!authToken) {
		return NextResponse.redirect(`${origin}/auth/sign-in`);
	}

	const user = await AuthApi.findUserByToken(authToken);
	if (!user) {
		return NextResponse.redirect(`${origin}/auth/sign-in`);
	}

	if (user.profile?.role !== ProfileRoleEnum.DIRECTOR) {
		return NextResponse.redirect(`${origin}/dashboard/teacher`);
	}

	return false;
}
