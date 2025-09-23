"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LoginRequest, LoginResponse, Role, UserProfile } from "@/types";
import { ApiClient, apiClient } from "@/lib/api";
import { bindGlobalErrorHandler, reportLog } from "@/lib/analytics";

type AuthStatus = "unauthenticated" | "authenticating" | "authenticated";

interface AuthContextValue {
  status: AuthStatus;
  user: UserProfile | null;
  token: string | null;
  // PUBLIC_INTERFACE
  login: (creds: LoginRequest) => Promise<void>;
  // PUBLIC_INTERFACE
  logout: () => Promise<void>;
  // PUBLIC_INTERFACE
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "jwt";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(STORAGE_KEY, token);
  else localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // bind global error reporting once
  useEffect(() => {
    bindGlobalErrorHandler();
  }, []);

  const client = useMemo(() => new ApiClient(() => token ?? getStoredToken()), [token]);

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await client.get("/api/user/profile");
      setUser(profile as UserProfile);
      setStatus("authenticated");
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, [client]);

  useEffect(() => {
    const existing = getStoredToken();
    if (existing) {
      setToken(existing);
      setStatus("authenticating");
      fetchProfile();
    }
  }, [fetchProfile]);

  const login = useCallback(async (creds: LoginRequest) => {
    setStatus("authenticating");
    try {
      const res = (await apiClient.post("/api/auth/login", creds)) as LoginResponse;
      setStoredToken(res.token);
      setToken(res.token);
      await reportLog("INFO", "login_success", { user: creds.username });
      await fetchProfile();
    } catch (e) {
      setStoredToken(null);
      setToken(null);
      setStatus("unauthenticated");
      await reportLog("WARN", "login_failed", { user: creds.username });
      throw e;
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    try {
      // attempt server logout but don't block UI on failure
      await apiClient.post("/api/auth/logout", {});
    } catch {
      // ignore
    } finally {
      setStoredToken(null);
      setToken(null);
      setUser(null);
      setStatus("unauthenticated");
      await reportLog("INFO", "logout");
    }
  }, []);

  const hasRole = useCallback(
    (...roles: Role[]) => {
      if (!user?.roles) return false;
      return roles.some((r) => user.roles.includes(r));
    },
    [user]
  );

  const value: AuthContextValue = useMemo(
    () => ({ status, user, token, login, logout, hasRole }),
    [status, user, token, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
