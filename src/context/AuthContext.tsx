import { createContext, useState } from "react";

export const AuthContext = createContext<any>({
    isAuth: false,
    token: false
});


const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const login = (token: string) => {
        setIsAuth(true);
        setToken(token);
    }
    const logout = () => {
        setIsAuth(false);
        setToken("");
    }
    return (
        <AuthContext.Provider value={{ isAuth, token, login, logout }}>{children}</ AuthContext.Provider>
    )
}

export default AuthContextProvider