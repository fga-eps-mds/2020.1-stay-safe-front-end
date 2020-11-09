import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Loader from "./components/Loader";
import { useUser } from "./hooks/user";
import HomeTabBar from "./navigation/HomeTabBar";
import Cadastro from "./screens/Cadastro";
import CityStatistics from "./screens/CityStatistics";
import FavoritePlaces from "./screens/FavoritePlaces";
import Login from "./screens/Login";
import NeighborhoodReview from "./screens/NeighborhoodReview";
import Occurrence from "./screens/Occurrence";
import OccurrenceDetails from "./screens/OccurrenceDetails";
import Occurrences from "./screens/Occurrences";
import Rating from "./screens/Rating";
import Ratings from "./screens/Ratings";
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
            <AppStack.Screen name="Rating" component={Rating} />
            <AppStack.Screen name="Ratings" component={Ratings} />
            <AppStack.Screen name="CityStatistics" component={CityStatistics} />
            <AppStack.Screen name="FavoritePlaces" component={FavoritePlaces} />
        </AppStack.Navigator>
    );
};

export default Routes;
