import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLogout } from '../logoutHandler';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    setLogout(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};