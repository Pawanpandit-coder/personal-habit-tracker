import mongoose from 'mongoose';

// 🔴 CHANGE 1: Apna MongoDB Atlas URI yahan daalein (Ya .env.local file mein MONGODB_URI define karein)
const MONGODB_URI = process.env.MONGODB_URI 

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
    // 🔴 CHANGE 2 (Optional): Yahan aap extra connection options add kar sakte hain agar zaroorat ho
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected Successfully');
            return mongoose;
        });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('❌ MongoDB Connection Error:', e.message);
        throw e;
    }

    return cached.conn;
}

