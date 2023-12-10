// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";
import role from "@/components/role.jsx";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function DELETE(req, { params }) {
  try {
    // Get the ID from the parameters
    const id = params.id;
    
    // Check the role of the user making the request
    const Role = await role();
    if (Role !== "superadmin" && Role !== "admin") {
      return NextResponse.json({ message: "Not Allowed" }, { status: 403 });
    }
    
    const checkisadmin = await authSchema.findById(id);
    if (checkisadmin.role === "superadmin" && Role !== "superadmin"){
      return NextResponse.json({ message: "Not Allowed" }, { status: 403 });
    }


    // Delete the user with the given ID from the database
    await authSchema.findByIdAndDelete(id);
    
    // Return a success message
    return NextResponse.json(
      { message: "Deleted Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    // Return the error message
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}