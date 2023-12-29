/*
import { NextResponse } from "next/server";
import { auth } from "./app/firebase"; // Adjust import path if needed
export function middleware(request) {
  const user =auth.currentUser;
  const url = request.nextUrl.clone(); // Get the requested URL
  if (url.pathname === "/dashboard") {
    if (!user) {
      // Not logged in, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (
    user &&
    (url.pathname === "/login" ||
      url.pathname === "/signup")
  ) {
    // Logged in, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next(); // Proceed as usual
}*/

