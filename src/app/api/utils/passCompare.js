// Importing necessary module
import bcrypt from "bcryptjs";

// Function to compare a plaintext password with a hashed password
const comparePassword = async (password, hashPassword) => {
  // Use bcrypt to compare the plaintext password with the hashed password
  const isMatch = await bcrypt.compare(password, hashPassword);
  
  // Return the result of the comparison
  return isMatch;
};

export default comparePassword;