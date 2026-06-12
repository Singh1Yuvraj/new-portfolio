import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolioforge";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global is used here to maintain a cached connection across hot reloads in development.
declare global {
  var mongoose: MongooseCached | undefined;
  var useMockDb: boolean | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (global.useMockDb) {
    return null;
  }

  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // 2s timeout for local development checks
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    console.warn("⚠️ MongoDB connection failed. Falling back to local mock database (mock_db.json).");
    global.useMockDb = true;
    return null;
  }

  return cached?.conn;
}

