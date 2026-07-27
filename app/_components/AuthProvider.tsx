"use client";

import { getMe, refreshToken, User } from "@/lib/services/apiAuth";
import { clearAccessToken } from "@/lib/utils/token";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function setAuthRoleCookie(role: "user" | "admin") {
  document.cookie = `auth-role=${role}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
}

function clearAuthRoleCookie() {
  document.cookie = "auth-role=; path=/; max-age=0";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function setUser(nextUser: User | null) {
    setUserState(nextUser);
    if (nextUser) {
      setAuthRoleCookie(nextUser.role);
    } else {
      clearAuthRoleCookie();
    }
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        const refreshRes = await refreshToken();
        if (!refreshRes?.accessToken) {
          setUser(null);
          return;
        }

        const me = await getMe();
        setUser(me ?? null);
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
