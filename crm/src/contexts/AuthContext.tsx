import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppApi from "../common/api/AppApi";
import { message } from 'antd';
import { AuthDataDto } from "../common/dto";
import TokenService from "../common/services/TokenService";
import PubSub from "../common/services/PubSub";

interface AuthContextValue {
    isLoggedIn: boolean;
    login: (authData: AuthDataDto) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(TokenService.isTokenValid());

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Неправильно введен Логин или Имя пользователя',
        });
    };

    const login = async (authData: AuthDataDto) => {
        try {
            const { access_token } = await AppApi.login(authData);
            TokenService.setToken(access_token);

            setIsLoggedIn(true);

            navigate('/');
        } catch (e) {
            error();
            console.error(e);
        }
    };

    const logout = async () => {
        try {
            await AppApi.logout();

            setIsLoggedIn(false);
            TokenService.removeToken();
            navigate('/Login');
        } catch (e) {
            console.error(e);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await AppApi.refresh();
            TokenService.setToken(response.access_token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    PubSub.on('auth', logout);

    const authContext = {
        isLoggedIn,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={authContext}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);