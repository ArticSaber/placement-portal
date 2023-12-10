import dbConnection from "../utils/db.js";
import { UserDetailsSchema } from "../utils/schema.js";
import { NextResponse } from "next/server";
import userId from "@/components/userId.jsx";
// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function POST(req) {
  try {
    const id = await userId();
    const data = await req.json();

    if (!data) {
      return NextResponse.json({ message: "Data is missing" }, { status: 400 });
    }
    data._id = id;
    await UserDetailsSchema.create(data);
    return NextResponse.json(
      { message: "User Added Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
