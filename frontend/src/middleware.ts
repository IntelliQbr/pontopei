import { NextRequest, NextResponse } from "next/server";
import { authorization_auth } from "./app/auth/auth";
import { authorization_admin_dashboard } from "./app/dashboard/admin/auth";
import { authorization_dashboard } from "./app/dashboard/auth";
import { authorization_director_dashboard } from "./app/dashboard/director/auth";
import { authorization_teacher_dashboard } from "./app/dashboard/teacher/auth";
import { authorization_onboarding } from "./app/onboarding/auth";

const authValidates = [
	authorization_auth,
	authorization_onboarding,
	authorization_admin_dashboard,
	authorization_director_dashboard,
	authorization_teacher_dashboard,
	authorization_dashboard,
];

export async function middleware(request: NextRequest) {
	try {
		for (const authValidate of authValidates) {
			const response = await authValidate(request);

			if (response) {
				return response;
			}
		}

		return NextResponse.next();
	} catch (error) {
		console.error(error);
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|images|videos|favicon.ico).*)",
	], // Skip all next files and important
};
