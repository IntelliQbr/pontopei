import { AuthApi } from "@/api/auth.api";
import { AUTH_TOKEN_NAME } from "@/constants";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { getCookie } from "@/utils/cookie-store";
import { NextRequest, NextResponse } from "next/server";

export async function authorization_director_dashboard(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (!pathname.startsWith("/dashboard/director")) {
		return false;
	}

	const origin = request.nextUrl.origin;
	const authToken = await getCookie(AUTH_TOKEN_NAME);
	if (!authToken) {
		return NextResponse.redirect(`${origin}/auth/sign-in`);
	}

	const user = await AuthApi.findUserByToken(authToken);
	if (user.profile?.role !== ProfileRoleEnum.DIRECTOR) {
		return NextResponse.redirect(
			`${origin}/dashboard/${user.profile?.role.toLowerCase()}`
		);
	}

	return false;
}
