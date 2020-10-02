import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { scale } from "../utils/scalling";

const Tab = createBottomTabNavigator();

import Home from "../screens/Home";
import Search from "../screens/Search";
import Report, { ReportButton } from "../screens/Report";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Occurrences from "../screens/Occurrences";

const HomeTabBar = () => {

  return (
    <>
      <Tab.Navigator
        initialRouteName={"Home"}
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
            } else if (route.name === "Occurrences") {
              iconName = "settings";
            }
            // } else if (route.name === "Settings") {
            //   iconName = "settings";
            // }

            return <Feather name={iconName} size={scale(24)} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#7DBFE2",
          inactiveTintColor: "#C8C8C8",
          showLabel: false,
          style: {
            height: "8.5%",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: scale(18),
            borderTopRightRadius: scale(18),
            marginTop: -scale(18),
          },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen
          name="Report"
          component={Report}
          options={({ navigation }) => ({
            tabBarButton: () => <ReportButton navObject={navigation} />,
          })}
        />
        <Tab.Screen name="Profile" component={Profile} />
        {/* <Tab.Screen name="Settings" component={Settings} /> */}
        <Tab.Screen name="Occurrences" component={Occurrences} />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabBar;
