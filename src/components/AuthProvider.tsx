"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { type AuthResponse, type AuthUser, fetchMe, logIn, logOut, signUp } from "@/lib/auth/client";

interface AuthContextValue {
  /** The logged-in manager, or null. */
  user: AuthUser | null;
  /** False until the first "who am I" check finishes. */
  ready: boolean;
  /** Each returns an error message, or null on success. */
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, manager: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  ready: true,
  login: async () => "Login isn't available right now.",
  signup: async () => "Login isn't available right now.",
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchMe().then((res) => {
      if (cancelled) return;
      setUser(res.user ?? null);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const finish = useCallback((res: AuthResponse) => {
    if (res.error !== undefined) return res.error;
    setUser(res.user);
    return null;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      login: async (email, password) => finish(await logIn(email, password)),
      signup: async (email, password, manager) => finish(await signUp(email, password, manager)),
      logout: async () => {
        await logOut();
        setUser(null);
      },
    }),
    [user, ready, finish]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
