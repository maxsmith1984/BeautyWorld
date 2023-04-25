import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppApi from "../common/api/AppApi";
import { AuthDataDto } from "../common/dto";

const TOKEN_KEY = 'access_token';

interface AuthContextValue {
    isLoggedIn: Boolean;
    login: (authData: AuthDataDto) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = async (authData: AuthDataDto) => {
        try {
            const { access_token } = await AppApi.login(authData);
            localStorage.setItem(TOKEN_KEY, access_token);

            setIsLoggedIn(true);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem(TOKEN_KEY);
        navigate('/Login');
    };

    const authContext = {
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);