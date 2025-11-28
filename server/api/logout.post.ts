import { getCookie, setCookie } from "h3";
import jwt from "jsonwebtoken";
import db from "../utils/db";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (token) {
    try {
      const config = useRuntimeConfig();
      const payload = jwt.verify(token, String(config.jwtSecret)) as {
        jti?: string;
      };
      if (payload?.jti) {
        db.prepare("DELETE FROM sessions WHERE jti = ?").run(payload.jti);
      }
    } catch {}
  }

  setCookie(event, "token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return { ok: true };
});
