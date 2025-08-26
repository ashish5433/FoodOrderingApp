import mongoose from "mongoose";

const uri=process.env.MONGO_URI

if(!uri)throw new Error("Not a Valid Mongodb Url.")

let cached=global.mongoose;

if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(uri,)
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}