import { isAuthenticated, removeAuthTokens } from "@/utils";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuthentication = () => {
      setAuthenticated(isAuthenticated());
    };

    checkAuthentication();
  }, []);

  const logout = () => {
    removeAuthTokens();
    setAuthenticated(false);
  };

  return {
    isAuthenticated: authenticated,
    logout,
  };
};
