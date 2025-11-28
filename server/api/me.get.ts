import db, { User } from "../utils/db";
import { getUserIdFromToken } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const userId = getUserIdFromToken(event);
  if (!userId)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const stmt = db.prepare("SELECT id, username, email FROM users WHERE id = ?");
  const user = stmt.get(userId) as User | undefined;
  if (!user)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  return user;
});
