import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  cookies().set("login", "", { expires: new Date(0) });
  const response = NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/electronix/1`
  );

  return response;
}
