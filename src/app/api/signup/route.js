// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import dbConnection from "../utils/db.js";
import role from "@/components/role.jsx";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function POST(req) {
  try {
    // Parse the request body
    const data = await req.json();

    // Check if email and password are provided
    if (!data.email || !data.password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }

    if (data.password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }
    // Check if the email already exists in the database
    const existinguser = await authSchema.findOne({ email: data.email });
    if (existinguser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create a new user in the database
    await authSchema.create(data);

    // Return a success message
    return NextResponse.json(
      { success: true, message: "User Added Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    // Return the error message
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
