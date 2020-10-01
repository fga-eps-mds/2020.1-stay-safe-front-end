import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeTabBar from "./navigation/HomeTabBar";
import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <>
            <AppStack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="HomeTabBar"
            >
                <AppStack.Screen name="HomeTabBar" component={HomeTabBar} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
            </AppStack.Navigator>
        </>
    );
};

export default Routes;
