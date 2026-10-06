import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    connectDB();
    const body = await req.json();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return Response.json({ message: "invalid credentials" }, { status: 400 })
    }
    if (user.password === body.password) {
      const token = generateToken({ userId: user._id, email: user.email })
      return Response.json({ message: "success", token, userData: { name: user.name, email: user.email } }, { status: 200 });
    }
    return Response.json({ message: "wrong password" }, { status: 400 });
  } catch (err) {
    console.log()
    return Response.json(
      {
        message: err.message,
      },
      { status: 500 },
    );
  }
}
