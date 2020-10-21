import AsyncStorage from "@react-native-community/async-storage";
import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from "react";
import { Alert } from "react-native";
import { ThemeProvider } from "styled-components";

import { authUser } from "../services/users";
import staySafeDarkTheme from "../styles/staySafeDarkTheme";
import staySafeTheme from "../styles/staySafeTheme";

interface SignInCredentials {
    username: string;
    password: string;
}

interface UserContextData {
    switchTheme: () => void;
    theme: AppTheme;
    data: UserState;
    isLoading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface AppTheme {
    type: string;
    primaryDarkBlue: string;
    primarySuperDarkBlue: string;
    primaryLightBlue: string;
    primaryWhite: string;
    primaryRed: string;
    primaryGray: string;
    primaryBackground: string;
    primaryBlack: string;
    heatMapGreen: string;
    heatMapOrange: string;
    heatMapRed: string;
}

interface UserState {
    username: string;
    token: string;
}

const UserContext = createContext<UserContextData | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState(staySafeTheme);

    const [data, setData] = useState<UserState>({ token: "", username: "" });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [token, username, themeType] = await AsyncStorage.multiGet([
                "@StaySafe:token",
                "@StaySafe:username",
                "@StaySafe:theme",
            ]);

            if (token[1] && username[1]) {
                setData({ token: token[1], username: username[1] });
            }

            setTheme(
                themeType[1] === "default" ? staySafeTheme : staySafeDarkTheme
            );

            setIsLoading(false);
        }

        setTimeout(() => {
            loadStorageData();
        }, 1000);
    }, []);

    const signIn = useCallback(async ({ username, password }) => {
        const response = await authUser({
            username,
            password,
        });

        if (!response.body.error && response.status === 200) {
            const { token } = response.body;

            await AsyncStorage.multiSet([
                ["@StaySafe:token", token],
                ["@StaySafe:username", username],
            ]);

            setData({ username, token });
        } else {
            Alert.alert("Erro ao logar usuário", response.body.error);
        }
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            "@StaySafe:token",
            "@StaySafe:username",
        ]);

        setData({ token: "", username: "" });
    }, []);

    const switchTheme = useCallback(async () => {
        await AsyncStorage.setItem(
            "@StaySafe:theme",
            theme.type === "default" ? "dark" : "default"
        );
        setTheme(theme === staySafeTheme ? staySafeDarkTheme : staySafeTheme);
    }, [theme]);

    return (
        <UserContext.Provider
            value={{ data, switchTheme, theme, isLoading, signIn, signOut }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserContext.Provider>
    );
};

export function useUser(): UserContextData {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }

    return context;
}