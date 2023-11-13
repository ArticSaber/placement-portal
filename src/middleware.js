import { NextResponse } from "next/server";
import { jwtVerifier } from "./app/api/utils/jwt";
import role from "@/components/role.jsx";

export async function middleware(req) {
  const Role = await role();
  const res = NextResponse.next();
  // dashboard page token verification

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname.includes("/api/login") ||
    req.nextUrl.pathname === "/signup" ||
    req.nextUrl.pathname.includes("/api/signup")
  ) {
    try {
      const token = req.cookies.get("token")?.value;
      if (token) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      //check token
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      const { payload } = await jwtVerifier(token);
      if (!payload) {
        res.cookie("token", null);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (req.nextUrl.pathname === "/Students" && Role === "student") {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
      // if (
      //   (req.nextUrl.pathname === "/Admin" && Role === "student") ||
      //   (req.nextUrl.pathname === "/Admin" && Role === "recruiter")
      // ) {
      //   return NextResponse.redirect(new URL("/dashboard", req.url));
      // }
    } catch (error) {
      console.log("test", error);
    }
  }

  // login page token verification

  return res;
}

export const config = { matcher: "/((?!.*\\.).*)" };
