import { verifyToken } from "@/lib/jwt";

export function auth(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  return verifyToken(token);
}
