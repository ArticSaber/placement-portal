import { NextResponse } from "next/server";
import { jwtVerifier } from "./app/api/utils/jwt";
import role from "@/components/role.jsx";

// Middleware function to handle request
export async function middleware(req) {
  // Fetch the user role
  const Role = await role();
  const res = NextResponse.next();

  // If the request is for the login page or login API
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/signup" ||
    req.nextUrl.pathname.includes("/api/login") ||
    req.nextUrl.pathname.includes("/api/signup")
  ) {
    try {
      // Check if a token is already present
      const token = req.cookies.get("token")?.value;
      // If a token is present, redirect the user to the Dashboard page
      if (token) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      // Check if a token is present
      const token = req.cookies.get("token")?.value;
      // If no token is present, redirect the user to the login page
      if (!token) {
        const path = new URL(req.url).pathname;
        if (path !== "/login" && path !== "/signup") {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
      // Verify the token
      const { payload } = await jwtVerifier(token);
      // If the token is not valid, remove the token and redirect the user to the login page
      if (!payload) {
        res.cookie("token", null);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Check the role of the user and the requested page
      // If the user is an admin trying to access the Superadmin or Admin page, redirect the user to the User page
      if (
        (req.nextUrl.pathname === "/Admin" && Role === "student") ||
        (req.nextUrl.pathname === "/Admin" && Role === "recruiter")
      ) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
      // If the user is a user trying to access the Superadmin, Admin, or User page, redirect the user to the Dashboard page
      if (
        (req.nextUrl.pathname === "/Recruiter" && Role === "student") ||
        (req.nextUrl.pathname === "/Recruiter" && Role === "admin")
      ) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
    } catch (error) {
      console.log("test", error);
    }
  }
  return res;
}

// Configuring the middleware to match all routes except those that contain a dot
export const config = { matcher: "/((?!.*\\.).*)" };
