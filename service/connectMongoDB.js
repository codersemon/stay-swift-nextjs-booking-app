// dependencies
import mongoose from "mongoose";
 
// getting MONGODB String
const MONGO_URI = process.env.MONGODB_URI;
const cached = {};
 
async function connectMongoDB() {
  // if mongodb string not found, throw error
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
 
  // if already connected to the db, then return connection from cache
  if (cached.connection) {
    return cached.connection;
  }
 
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
 
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}
export default connectMongoDB;