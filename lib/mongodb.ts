import mongoose from "mongoose";


// Define a function to connection cache type
type mongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include the mongoose cache
declare global {
    var mongooseCache: mongooseCache;
}
// Initialize the mongoose cache if it doesn't exist
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };
const MONGODB_URI = process.env.MONGODB_URI;

//Validation: Throw an error if the MONGODB_URI is not defined
if (!MONGODB_URI) {
    throw new Error("Please define the environment variable MONGODB_URI inside .env. file");
}

// Function to connect to MongoDB using Mongoose with caching
export async function connectToDatabase(): Promise<typeof mongoose> {
    if (global.mongooseCache.conn) { // Return the cached connection if it exists
        return global.mongooseCache.conn;
    }

    if (!global.mongooseCache.promise) { // Create a new connection promise if it doesn't exist
        const opts = {
            bufferCommands: false,
        };

        // Create a new Mongoose connection promise
        global.mongooseCache.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
    // Await the connection promise
    global.mongooseCache.conn = await global.mongooseCache.promise;
    return global.mongooseCache.conn; // Return the established c onnection
    } catch (error) {
        global.mongooseCache.promise = null; // Reset the promise on failure
        throw error;
    }
}


