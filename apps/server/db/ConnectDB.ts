import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

global.mongoose = {
  conn: null,
  promise: null,
};
console.log("Loaded API Key:", process.env.GROQ_API_KEY ? "Yes ✅" : "No ❌");

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const ConnectDB = async () => {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Database is Already Connected");
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      global.mongoose.promise = mongoose.connect(MONGODB_URI, {
        autoIndex: true,
      });
    }

    global.mongoose.conn = await global.mongoose.promise;
    console.log("Connected to Database");

    return global.mongoose.conn;
  } catch (error) {
    console.log(`Error while connecting to database: ${error.message}`);
    process.exit(1);
  }
};
