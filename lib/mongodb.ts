import { Goal } from "lucide-react";
import mongoose, { Mongoose } from "mongoose";

//1. Define a function to connection cache type
type mongooseCache = {
    conn: typeof mongoose | null; // Cached connection
    promise: Promise<typeof mongoose> | null; // Connection promise
};

//2. Extend the global object to include the mongoose cache
declare global {
    var mongoCache: mongooseCache; // Mongoose connection cache
}

//3. Initialize the mongoose cache if it doesn't exist
if (!global.mongoCache) {
    global.mongoCache = { conn: null, promise: null };
}
let cached: mongooseCache = global.mongoCache || undefined;

//4. Defining the MONGODB_URI constant
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("Please define the environment variable MONGODB_URI inside .env. file");
}



//5. Function to connect to MongoDB using Mongoose with caching
export async function connectToDatabase(): Promise<typeof mongoose> {
    const cache = global.mongoCache;

    if (cache.conn) { // Return the cached connection if it exists
        return cache.conn;
    }

    if (!cache.promise) { // Create a new connection promise if it doesn't exist
        const opts = { bufferCommands: false, };// Disable mongoose buffering

        // Create a new Mongoose connection promise
        cache.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose); // Return the mongoose instance  
    }

    try {
        cache.conn = await cache.promise; // Await the connection promise
        return cache.conn;
    } catch (err) { // Handle connection errors
        cache.promise = null;
        throw err;
    }
}


