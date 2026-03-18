import { useState, useEffect, createContext, useContext } from "react";

type User = {
  email: string;
};

type Session = {
  token: string;
};

const ADMIN_EMAIL = "admin@portfolio.local";
const ADMIN_PASSWORD = "admin12345";
const AUTH_KEY = "portfolio_admin_auth";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const raw = window.localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Session & User;
        setSession({ token: parsed.token });
        setUser({ email: parsed.email });
        setIsAdmin(true);
      } catch {
        window.localStorage.removeItem(AUTH_KEY);
      }
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return { error: new Error("Credenciales invalidas") };
    }

    const nextSession: Session = { token: `${Date.now()}` };
    const nextUser: User = { email: ADMIN_EMAIL };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          token: nextSession.token,
          email: nextUser.email,
        })
      );
    }

    setSession(nextSession);
    setUser(nextUser);
    setIsAdmin(true);

    return { error: null };
  };

  const signOut = async () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_KEY);
    }
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
