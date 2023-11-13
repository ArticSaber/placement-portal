import { NextResponse } from "next/server";
import { authUser } from "../utils/schema.js";
import { jwtGenrator } from "../utils/jwt.js";
import dbConnection from "../utils/db.js";
import comparePassword from "../utils/passCompare.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }
    console.log(email.toLowerCase());
    const User = await authUser.findOne({ email: email.toLowerCase() });
    if (!User) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isMatch = await comparePassword(password, User.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }

    const token = await jwtGenrator({
      payload: { id: User._id, role: User.role },
    });

    const response = NextResponse.json(
      { message: "Logged in Succesfully!" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
