import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;

export function generateToken(payload) {
  const token = jwt.sign(payload, SECRET, { expiresIn: "10m" });
  return token;
}
export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
