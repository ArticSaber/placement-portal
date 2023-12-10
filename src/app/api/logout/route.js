// Importing necessary modules
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnection from "../utils/db.js";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function GET(req) {
  try {
    // Initialize a cookie store
    const cookieStore = cookies();
    
    // Remove the token from the cookie store
    cookieStore.set("token", null);
    
    // Return a success message with a 200 status code
    return NextResponse.json(
      { message: "Logout successfully", Status: true },
      { status: 200 }
    );
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}