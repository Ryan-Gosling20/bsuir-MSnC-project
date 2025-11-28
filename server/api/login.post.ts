import db, { User } from "../utils/db";
import bcrypt from "bcrypt";
import { readBody } from "h3";
import { signToken, setTokenCookie } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Record<string, any>;
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");

  if (!email || !password)
    throw createError({
      statusCode: 400,
      statusMessage: "Email & password required",
    });

  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = stmt.get(email) as User | undefined;
  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  const token = signToken(user);
  setTokenCookie(event, token);

  return { id: user.id, username: user.username, email: user.email };
});
