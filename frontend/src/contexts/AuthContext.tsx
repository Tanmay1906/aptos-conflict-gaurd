import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

declare global {
  interface Window {
    aptos?: {
      connect?: () => Promise<{ address?: string }>;
      disconnect?: () => Promise<void>;
      // add other Petra wallet methods if needed
    };
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  firmDetails?: {
    address: string;
    phone: string;
    licenseNumber: string;
  };
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const persistToken = useCallback((t: string | null) => {
    if (t) localStorage.setItem("authToken", t);
    else localStorage.removeItem("authToken");
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    persistToken(null);
  }, [persistToken]);

  const authFetch = useCallback(
    async (endpoint: string, init: RequestInit = {}) => {
      if (!token) throw new Error("No auth token available");

      const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
      const headers = new Headers(init.headers || {});
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");

      const response = await fetch(url, {
        ...init,
        headers,
        credentials: "include",
      });

      if (response.status === 401) {
        clearSession();
        throw new Error("Session expired. Please log in again.");
      }

      return response;
    },
    [token, clearSession, API_URL]
  );

  // Restore user state and wallet address on refresh if token exists
  useEffect(() => {
    const restoreUser = async () => {
      let walletAddress = localStorage.getItem("walletAddress") || undefined;
      if (token) {
        setIsLoading(true);
        try {
          const res = await fetch(`${API_URL}/api/v1/auth/me`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            credentials: "include"
          });
          const data = await res.json();
          if (res.ok && data?.data?.user) {
            setUser(walletAddress ? { ...data.data.user, walletAddress } : data.data.user);
          } else {
            clearSession();
          }
        } catch {
          clearSession();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    restoreUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Sending login request to:', `${API_URL}/api/v1/auth/login`);
      
      // Manually create the request body as a string to ensure proper formatting
      const requestBody = JSON.stringify({ email, password });
      console.log('Request body:', requestBody);
      
      // Use fetch with more control over the request
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: requestBody,
      });

      const responseData = await response.json().catch(e => ({}));
      console.log('Login response:', { status: response.status, data: responseData });

      if (!response.ok) {
        throw new Error(responseData.message || `Login failed with status ${response.status}`);
      }

      const { token, user } = responseData.data || responseData || {};

      if (!token) throw new Error("No authentication token received");

      setToken(token);
      persistToken(token);
      setUser(user);

      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      navigate("/login");
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authFetch("/api/v1/auth/logout", { method: "GET" });
    } catch {}
    clearSession();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        // Example Petra wallet connect logic
        connectWallet: async () => {
          if (!window.aptos) throw new Error("Petra wallet not found");
          try {
            const response = await window.aptos.connect();
            if (response && response.address) {
              localStorage.setItem("walletAddress", response.address);
              setUser((prev) => prev ? { ...prev, walletAddress: response.address } : prev);
            }
          } catch (err) {
            throw new Error("Failed to connect Petra wallet");
          }
        },
        disconnectWallet: () => {
          localStorage.removeItem("walletAddress");
          setUser((prev) => prev ? { ...prev, walletAddress: undefined } : prev);
        },
        authFetch,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
