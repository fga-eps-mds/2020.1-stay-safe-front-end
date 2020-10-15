import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useState, createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";

import Routes from "./src/routes";
import staySafeDarkTheme from "./src/styles/staySafeDarkTheme";
import staySafeTheme from "./src/styles/staySafeTheme";

const GeneralAppContext = createContext();

export function useGeneralAppContext() {
    return useContext(GeneralAppContext);
}

const App = () => {
    const [theme, setTheme] = useState(staySafeTheme);

    const switchTheme = useCallback(
        () =>
            setTheme(
                theme === staySafeTheme ? staySafeDarkTheme : staySafeTheme
            ),
        [theme]
    );

    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>
                <GeneralAppContext.Provider
                    value={{
                        switchTheme,
                    }}
                >
                    <Routes />
                </GeneralAppContext.Provider>
            </ThemeProvider>
        </NavigationContainer>
    );
};

export default App;
