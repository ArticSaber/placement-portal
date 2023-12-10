// Importing necessary modules
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hostedLink: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  projects: [ProjectSchema],
});

// Define the User schema
const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validator: {
        validate: (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create the model from the schema
const authSchema = mongoose.models.authUser || mongoose.model("authUser", User);
const UserDetailsSchema =
  mongoose.models.UserSchema || mongoose.model("UserSchema", UserSchema);
export { authSchema, UserDetailsSchema };
