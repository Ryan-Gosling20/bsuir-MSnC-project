import Database from "better-sqlite3";
import { join } from "path";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  birthdate: string;
  createdAt: string;
}

const db = new Database(join(process.cwd(), "data.sqlite"));

db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  birthdate TEXT NOT NULL,
  createdAt TEXT NOT NULL
)
`,
).run();

export default db;
