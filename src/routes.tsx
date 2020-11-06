import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Loader from "./components/Loader";
import { useUser } from "./hooks/user";
import HomeTabBar from "./navigation/HomeTabBar";
import Cadastro from "./screens/Cadastro";
import CityStatistics from "./screens/CityStatistics";
import Login from "./screens/Login";
import NeighborhoodReview from "./screens/NeighborhoodReview";
import Occurrence from "./screens/Occurrence";
import OccurrenceDetails from "./screens/OccurrenceDetails";
import Occurrences from "./screens/Occurrences";
import Review from "./screens/Review";

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
    const { isLoading } = useUser();

    if (isLoading) {
        return <Loader />;
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
            <AppStack.Screen name="Review" component={Review} />
            <AppStack.Screen
                name="NeighborhoodReview"
                component={NeighborhoodReview}
            />
            <AppStack.Screen
                name="OccurrenceDetails"
                component={OccurrenceDetails}
            />
            <AppStack.Screen name="CityStatistics" component={CityStatistics} />
        </AppStack.Navigator>
    );
};

export default Routes;
