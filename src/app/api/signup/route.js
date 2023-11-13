import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { authUser, UserDetails } from "../utils/schema.js";
import { create } from "lodash";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { email, password, role } = await req.json();
    if (!email) {
      return NextResponse.json("Email is missing", { status: 400 });
    }
    if (!password) {
      return NextResponse.json("Password is missing", { status: 400 });
    }
    if (!role) {
      return NextResponse.json("Role is missing", { status: 400 });
    }
    try {
      const createUser = await authUser.create({
        email: email,
        password: password,
        role: role || "student",
      });
      if (role === "student") {
        await UserDetails.create({
          user: createUser._id,
          name: createUser.email.split("@")[0],
          designation: "",
          regNo: "",
          description: "",
          address: "",
          phone: null,
          email: createUser.email,
          dob: "",
          socials: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            github: "",
          },
          education: [],
          skills: [],
          experience: [],
          projects: [],
          certificates: [],
          languages: [],
          photo: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
