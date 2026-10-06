import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  return Response.json({
    message: "Get request accepted!",
  });
}
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const user = await User.create(body);
    return Response.json(user, { status: 200 });
  } catch (err) {
    console.log(err)
    return Response.json({ message: err.message }, { status: 500 });
  }
}
