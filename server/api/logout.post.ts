import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
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
