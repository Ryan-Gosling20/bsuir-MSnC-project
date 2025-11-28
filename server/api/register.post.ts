import db, { User } from "../utils/db";
import bcrypt from "bcrypt";
import { readBody } from "h3";
import { signToken, setTokenCookie } from "../utils/auth";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseDate(dateStr: string): Date | null {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Record<string, any>;
  const username = String(body?.username ?? "").trim();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");
  const birthdate = String(body?.birthdate ?? "").trim();

  if (!username || !email || !password || !birthdate)
    throw createError({ statusCode: 400, statusMessage: "Required fields" });
  if (!isValidEmail(email))
    throw createError({ statusCode: 400, statusMessage: "Invalid email" });
  if (password.length < 8)
    throw createError({ statusCode: 400, statusMessage: "Password too short" });

  const bd = parseDate(birthdate);
  if (!bd)
    throw createError({ statusCode: 400, statusMessage: "Invalid birthdate" });
  const age = Math.floor(
    (new Date().getTime() - bd.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
  if (age < 13)
    throw createError({
      statusCode: 400,
      statusMessage: "Must be at least 13 years old",
    });

  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const existing = stmt.get(email as any) as User | undefined;
  if (existing)
    throw createError({
      statusCode: 409,
      statusMessage: "Email already registered",
    });

  const passwordHash = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const user: User = {
    id,
    username,
    email,
    passwordHash,
    birthdate: bd.toISOString().slice(0, 10),
    createdAt,
  };

  db.prepare(
    `
    INSERT INTO users (id, username, email, passwordHash, birthdate, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  ).run(
    user.id,
    user.username,
    user.email,
    user.passwordHash,
    user.birthdate,
    user.createdAt,
  );

  const token = signToken(user);
  setTokenCookie(event, token);

  event.node.res.statusCode = 201;
  return { id: user.id, username: user.username, email: user.email };
});
