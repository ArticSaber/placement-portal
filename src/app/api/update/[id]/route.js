// Importing necessary modules
import { NextResponse } from "next/server";
import { UserDetailsSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function PUT(req, { params }) {
  try {
    // Retrieve the user ID from the parameters
    const id = params.id;

    // Parse the request body to get the data to update
    const data = await req.json();

    // Update the user in the database
    await UserDetailsSchema.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Return a success message with a 200 status code
    return NextResponse.json(
      { message: "Updated Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
