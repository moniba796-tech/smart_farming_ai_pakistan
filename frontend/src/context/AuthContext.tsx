/**
 * context/AuthContext.tsx
 * --------------------------
 * App-wide login state. Stores the JWT in localStorage (via
 * api/client.ts's getStoredToken/setStoredToken) and keeps the current
 * user object in memory, refreshing it from /api/auth/me on page load if
 * a token is already present.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginUser, registerUser, fetchMe, getStoredToken, setStoredToken } from "@/api/client";
import type { AuthUser, LoginInput, RegisterInput } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<{ success: boolean; error?: string }>;
  register: (input: RegisterInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const res = await fetchMe();
    if (res.success) {
      setUser(res.user);
    } else {
      // Token invalid/expired — clear it.
      setStoredToken(null);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (input: LoginInput) => {
    const res = await loginUser(input);
    if (res.success) {
      setStoredToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: (res as { error: string }).error };
  };

  const register = async (input: RegisterInput) => {
    const res = await registerUser(input);
    if (res.success) {
      setStoredToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: (res as { error: string }).error };
  };

  const logout = () => {
    setStoredToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
