import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, TextInput } from "react-native";

import AppProvider from "./src/hooks/";
import Routes from "./src/routes";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
    return (
        <NavigationContainer>
            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    );
};

export default App;
