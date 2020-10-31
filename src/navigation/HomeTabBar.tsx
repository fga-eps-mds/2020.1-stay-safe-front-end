import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "styled-components";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Report, { ReportButton } from "../screens/Report";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import { scale } from "../utils/scalling";

const Tab = createBottomTabNavigator();

const HomeTabBar: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName = "";

                        if (route.name === "Home") {
                            iconName = "map";
                        } else if (route.name === "Search") {
                            iconName = "search";
                        } else if (route.name === "Report") {
                            iconName = "bell";
                        } else if (route.name === "Profile") {
                            iconName = "user";
                        } else if (route.name === "Settings") {
                            iconName = "settings";
                        }

                        return (
                            <Feather
                                name={iconName}
                                size={scale(24)}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor:
                        theme.type === "dark"
                            ? theme.primarySuperDarkBlue
                            : theme.primaryLightBlue,
                    inactiveTintColor: theme.primaryGray,
                    showLabel: false,
                    style: {
                        height: "8.5%",
                        backgroundColor: theme.primaryWhite,
                        borderTopLeftRadius: scale(18),
                        borderTopRightRadius: scale(18),
                        borderTopWidth: 0,
                        marginTop: -scale(24),
                    },
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen
                    name="Report"
                    component={Report}
                    options={({ navigation }) => ({
                        tabBarButton: () => (
                            <ReportButton navObject={navigation} />
                        ),
                    })}
                />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </>
    );
};

export default HomeTabBar;
