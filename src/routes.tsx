import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CircularLoader from "./components/CircularLoader";
import { useUser } from "./hooks/user";
import HomeTabBar from "./navigation/HomeTabBar";
import Cadastro from "./screens/Cadastro";
import CityStatistics from "./screens/CityStatistics";
import Login from "./screens/Login";
import Occurrence from "./screens/Occurrence";
import OccurrenceDetails from "./screens/OccurrenceDetails";
import Occurrences from "./screens/Occurrences";

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
    const { isLoading } = useUser();

    if (isLoading) {
        return <CircularLoader size={50} />;
    }

    return (
        <AppStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeTabBar"
        >
            <AppStack.Screen name="HomeTabBar" component={HomeTabBar} />
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Cadastro" component={Cadastro} />
            <AppStack.Screen name="Occurrence" component={Occurrence} />
            <AppStack.Screen name="Occurrences" component={Occurrences} />
            <AppStack.Screen
                name="OccurrenceDetails"
                component={OccurrenceDetails}
            />
            <AppStack.Screen name="CityStatistics" component={CityStatistics} />
        </AppStack.Navigator>
    );
};

export default Routes;
