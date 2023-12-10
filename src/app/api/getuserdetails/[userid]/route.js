// Importing necessary modules
import { NextResponse } from "next/server";
import { UserDetailsSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function GET(req, { params }) {
  try {
    // Retrieve the user ID from the parameters
    const userId = params.userid;

    // Retrieve the user from the database
    const user = await UserDetailsSchema.findById({ _id: userId });

    // If the user is not found, return a 404 status code
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If the user is found, return the user data with a 200 status code
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
