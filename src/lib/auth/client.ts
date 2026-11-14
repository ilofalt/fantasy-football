export interface AuthUser {
  email: string;
  manager: string;
}

export type AuthResponse = { user: AuthUser | null; error?: undefined } | { user?: undefined; error: string };

const UNAVAILABLE = "Login isn't available right now.";

async function request(path: string, init?: RequestInit): Promise<AuthResponse> {
  try {
    const res = await fetch(`/api/auth/${path}`, {
      credentials: "same-origin",
      ...init,
      headers: init?.body ? { "content-type": "application/json" } : undefined,
    });
    const data = await res.json();
    if (!res.ok) return { error: typeof data?.error === "string" ? data.error : UNAVAILABLE };
    return { user: data.user ?? null };
  } catch {
    // No backend (local dev, or not deployed yet): behave as logged out.
    return { error: UNAVAILABLE };
  }
}

const post = (path: string, body: unknown) => request(path, { method: "POST", body: JSON.stringify(body) });

export const fetchMe = () => request("me");
export const logIn = (email: string, password: string) => post("login", { email, password });
export const signUp = (email: string, password: string, manager: string) =>
  post("signup", { email, password, manager });
export const logOut = () => post("logout", {});
