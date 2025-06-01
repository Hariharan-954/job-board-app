import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db(); 
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    }
  }
};

export const getDB = () => {
  if (!db) throw new Error("❌ DB not connected");
  return db;
};
