import { useEffect, useState } from "react";
import { checkAuth } from "../utils/checkAuth";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuth = async () => {
    const result = await checkAuth();
    setIsAuthenticated(result);
  };

  useEffect(() => {
    refreshAuth();
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}