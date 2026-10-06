import { connectDB } from "@/lib/mongodb";
import { auth } from "@/middleware/auth";

export function GET(req) {
    try {
        connectDB();
        auth(req)
        return Response.json({ message: 'okay it is me' }, { status: 200 })
    } catch (err) {
        return Response.json({message:"something wrong"},{status:500})
    }
}