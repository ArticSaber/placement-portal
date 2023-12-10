// Importing necessary modules
import { connect, connection } from "mongoose";

const dbConnection = (URL) => {
  try {
    // Attempt to connect to the MongoDB database
    connect(URL);
    
    // Log a success message when the connection is established
    connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    // Log an error message if the connection fails
    console.log("Error in connecting to DB", error);
  }
};

export default dbConnection;