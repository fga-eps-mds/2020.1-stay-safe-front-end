import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from "react";
import { ThemeProvider } from "styled-components";

import staySafeDarkTheme from "../styles/staySafeDarkTheme";
import staySafeTheme from "../styles/staySafeTheme";

interface UserContextData {
    switchTheme: () => void;
    theme: AppTheme;
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

const UserContext = createContext<UserContextData | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState(staySafeTheme);
    console.log("Tema do hook => ", theme);

    const switchTheme = useCallback(
        () =>
            setTheme(
                theme === staySafeTheme ? staySafeDarkTheme : staySafeTheme
            ),
        [theme]
    );

    return (
        <UserContext.Provider value={{ switchTheme, theme }}>
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
