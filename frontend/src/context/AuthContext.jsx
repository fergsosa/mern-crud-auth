import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
import { COOKIE_JWT_NAME } from "../config/config.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be user within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      return setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove(COOKIE_JWT_NAME);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookiesToken = Cookies.get(COOKIE_JWT_NAME);

      if (!cookiesToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookiesToken);
        if (!res.data) return setIsAuthenticated(false);
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
