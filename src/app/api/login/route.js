// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import { jwtGenrator } from "../utils/jwt.js";
import dbConnection from "../utils/db.js";
import comparePassword from "../utils/passCompare.js";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function POST(req) {
  try {
    // Parse the request body to get the email and password
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }

    // Find the user with the given email
    const User = await authSchema.findOne({ email: email.toLowerCase() });

    // If the user is not found, return a 404 status code
    if (!User) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the provided password with the stored password
    const isMatch = await comparePassword(password, User.password);

    // If the passwords do not match, return a 400 status code
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    // Generate a JWT for the user
    const token = await jwtGenrator({
      payload: { id: User._id, role: User.role },
    });

    // Create a response with a success message and a 200 status code
    const response = NextResponse.json(
      { success: true, message: "Logged in Succesfully!" },
      { status: 200 }
    );

    // Set the JWT as a cookie in the response
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    // Return the response
    return response;
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
