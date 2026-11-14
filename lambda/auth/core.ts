import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { MANAGERS_BY_TEAM } from "../../src/content/managers";

// Accounts for the league's managers: email + password, one account per
// manager. Passwords are scrypt-hashed but otherwise kept deliberately simple
// (this is a 12-person league site, not a bank).

const scryptAsync = promisify(scrypt);

export const SESSION_SECONDS = 365 * 24 * 60 * 60;
export const MIN_PASSWORD_LENGTH = 4;
export const MANAGER_NAMES = Object.values(MANAGERS_BY_TEAM);

export interface User {
  email: string;
  manager: string;
  passwordHash: string;
}

export interface Session {
  email: string;
  manager: string;
  /** Epoch seconds. */
  expiresAt: number;
}

export interface AuthStore {
  createUser(user: User): Promise<"ok" | "email-taken" | "manager-taken">;
  getUser(email: string): Promise<User | null>;
  putSession(tokenHash: string, session: Session): Promise<void>;
  getSession(tokenHash: string): Promise<Session | null>;
  deleteSession(tokenHash: string): Promise<void>;
}

export interface AuthResult {
  status: number;
  body: Record<string, unknown>;
  /** A new session token to set as the cookie, or null to clear it. */
  token?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = (await scryptAsync(password, salt, 32)) as Buffer;
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = (await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length)) as Buffer;
  return timingSafeEqual(actual, expected);
}

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const normalizeEmail = (email: unknown) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const fail = (status: number, error: string): AuthResult => ({ status, body: { error } });

async function startSession(store: AuthStore, user: { email: string; manager: string }): Promise<AuthResult> {
  const token = randomBytes(32).toString("hex");
  await store.putSession(hashToken(token), {
    email: user.email,
    manager: user.manager,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  });
  return { status: 200, body: { user: { email: user.email, manager: user.manager } }, token };
}

export async function signup(
  store: AuthStore,
  input: { email?: unknown; password?: unknown; manager?: unknown }
): Promise<AuthResult> {
  const email = normalizeEmail(input.email);
  const { password, manager } = input;
  if (!EMAIL_PATTERN.test(email)) return fail(400, "Enter a valid email address.");
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return fail(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (typeof manager !== "string" || !MANAGER_NAMES.includes(manager)) {
    return fail(400, "Pick which manager you are.");
  }

  const created = await store.createUser({ email, manager, passwordHash: await hashPassword(password) });
  if (created === "email-taken") return fail(409, "That email already has an account. Try logging in.");
  if (created === "manager-taken") return fail(409, `${manager} already has an account.`);
  return startSession(store, { email, manager });
}

export async function login(
  store: AuthStore,
  input: { email?: unknown; password?: unknown }
): Promise<AuthResult> {
  const email = normalizeEmail(input.email);
  const user = email && typeof input.password === "string" ? await store.getUser(email) : null;
  if (!user || !(await verifyPassword(input.password as string, user.passwordHash))) {
    return fail(401, "Wrong email or password.");
  }
  return startSession(store, user);
}

export async function me(store: AuthStore, token: string | undefined): Promise<AuthResult> {
  const session = token ? await store.getSession(hashToken(token)) : null;
  if (!session || session.expiresAt <= Date.now() / 1000) return { status: 200, body: { user: null } };
  return { status: 200, body: { user: { email: session.email, manager: session.manager } } };
}

export async function logout(store: AuthStore, token: string | undefined): Promise<AuthResult> {
  if (token) await store.deleteSession(hashToken(token));
  return { status: 200, body: { user: null }, token: null };
}
