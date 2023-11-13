import { SignJWT, jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const jwtGenrator = async ({ payload }) => {
  const alg = "HS256";
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXPIRE)
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
};

const jwtVerifier = async (token) => {
  try {
    return await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
  } catch (error) {
    console.log(error);
    // cookies().delete("token");
  }
};

const jwtDecode = async (token) => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
};

export { jwtGenrator, jwtVerifier, jwtDecode };
