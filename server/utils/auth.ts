import jwt from "jsonwebtoken";
import { setCookie, getCookie, H3Event } from "h3";
import { useRuntimeConfig } from "#imports";
import db from "./db";

type LightUser = {
  id: string;
  username: string;
};

export function signToken(user: LightUser) {
  const config = useRuntimeConfig();
  const secret = String(config.jwtSecret);
  const expiresSec =
    Number(config.jwtExpiresInSeconds) ||
    (typeof config.jwtExpiresIn === "number"
      ? Number(config.jwtExpiresIn)
      : 3600);

  const jti = (globalThis as any).crypto?.randomUUID?.() ?? String(Date.now());

  const token = jwt.sign(
    { sub: user.id, username: user.username, jti },
    secret,
    { expiresIn: `${expiresSec}s` },
  );

  const expiresAt = new Date(Date.now() + expiresSec * 1000).toISOString();
  db.prepare(
    "INSERT INTO sessions (jti, userId, expiresAt) VALUES (?, ?, ?)",
  ).run(jti, user.id, expiresAt);

  return token;
}

export function setTokenCookie(event: H3Event, token: string) {
  setCookie(event, "token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600,
  });
}

export function getUserIdFromToken(event: H3Event): string | null {
  const token = getCookie(event, "token");
  if (!token) return null;

  const config = useRuntimeConfig();
  try {
    const payload = jwt.verify(token, String(config.jwtSecret)) as {
      sub: string;
      jti?: string;
    };
    const jti = payload.jti;
    if (!jti) return null;

    const row = db
      .prepare("SELECT jti, userId, expiresAt FROM sessions WHERE jti = ?")
      .get(jti) as
      | { jti: string; userId: string; expiresAt: string }
      | undefined;

    if (!row) return null;
    if (new Date(row.expiresAt).getTime() < Date.now()) {
      db.prepare("DELETE FROM sessions WHERE jti = ?").run(jti);
      return null;
    }

    return payload.sub;
  } catch {
    return null;
  }
}
