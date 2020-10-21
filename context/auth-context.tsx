import React, { useEffect, useState } from "react";

export interface AuthContextData {
  token: string;
  user: any;
}

export interface AuthContextValue {
  data: AuthContextData | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextValue>({
  login: () => {},
  logout: () => {},
  data: null,
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [data, setData] = useState<AuthContextData | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");
    if (localToken && localUser) {
      login(JSON.parse(localUser), localToken);
    }
  }, []);

  const login = (user: any, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setData({ user, token });
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setData(null);
  };

  return (
    <AuthContext.Provider value={{ data, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
