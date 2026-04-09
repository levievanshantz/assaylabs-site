import { NextRequest, NextResponse } from "next/server";

const BETA_PASSWORD = process.env.BETA_PASSWORD || "0000";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.password === BETA_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("assay-beta-auth", "granted", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
