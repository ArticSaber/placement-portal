// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import dbConnection from "../utils/db.js";
import userId from "@/components/userId.jsx";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function POST(req) {
  try {
    // Parse the request body to get the role
    const id = await userId();
    const { role } = await req.json();

    if (role === "superadmin") {
      const test = await authSchema.find({ role: role, _id: { $ne: id } });
      return NextResponse.json(test, { status: 200 });
    }

    // Find all users with the specified role
    const list = await authSchema.find({ role: role });

    // Return the list of users with a 200 status code
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
