// Importing necessary modules
import { SignJWT, jwtVerify } from "jose";

// Function to generate a JWT
const jwtGenrator = async ({ payload }) => {
  const alg = "HS256";
  // Create a new JWT with the provided payload
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXPIRE)
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
};

// Function to verify a JWT
const jwtVerifier = async (token) => {
  try {
    // Verify the provided JWT
    return await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
};

// Export the JWT generator and verifier functions
export { jwtGenrator, jwtVerifier };