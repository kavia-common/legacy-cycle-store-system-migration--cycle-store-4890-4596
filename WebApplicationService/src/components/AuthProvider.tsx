"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiClient } from "@/lib/api-client";
import { getToken, setToken, hasToken } from "@/lib/tokenStorage";
import type { UserProfile } from "@/types";
import { logError } from "@/lib/logger";

type AuthState = {
  user: UserProfile | null;
  loading: boolean;
  // PUBLIC_INTERFACE
  login: (username: string, password: string) => Promise<boolean>;
  // PUBLIC_INTERFACE
  logout: () => Promise<void>;
  // PUBLIC_INTERFACE
  hasRole: (roles: string[] | string) => boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const hasRole = useCallback(
    (roles: string[] | string) => {
      const r = Array.isArray(roles) ? roles : [roles];
      if (!user?.roles?.length) return false;
      return r.some((req) => user.roles.includes(req));
    },
    [user]
  );

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { token } = await ApiClient.login(username, password);
      setToken(token);
      const profile = await ApiClient.getProfile();
      setUser(profile);
      return true;
    } catch (e) {
      logError("Login failed", { error: (e as Error).message });
      setToken(null);
      setUser(null);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await ApiClient.logout();
    } catch {
      /* ignore */
    } finally {
      setToken(null);
      setUser(null);
    }
  }, []);

  // Bootstrap session from token if present
  useEffect(() => {
    async function bootstrap() {
      setLoading(true);
      try {
        if (hasToken() && getToken()) {
          const profile = await ApiClient.getProfile();
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch (e) {
        logError("Profile fetch failed", { error: (e as Error).message });
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    void bootstrap();
  }, []);

  const value: AuthState = useMemo(
    () => ({ user, loading, login, logout, hasRole }),
    [user, loading, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth(): AuthState {
  /** Retrieve auth context with session, RBAC helpers, and login/logout APIs. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
