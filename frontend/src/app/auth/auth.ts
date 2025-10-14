import { AUTH_TOKEN_NAME } from "@/constants";
import { getCookie } from "@/utils/cookie-store";
import { NextRequest, NextResponse } from "next/server";

export async function authorization_auth(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (!pathname.startsWith("/auth")) {
        return false;
    }

    const authToken = await getCookie(AUTH_TOKEN_NAME);

    if (authToken) {
        const origin = request.nextUrl.origin;

        return NextResponse.redirect(`${origin}/dashboard`);
    }

    return false;
}
