import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnection from "../utils/db.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function GET(req) {
  try {
    const cookieStore = cookies();
    cookieStore.set("token", null);
    return NextResponse.json(
      { message: "Logout successfully", Status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
