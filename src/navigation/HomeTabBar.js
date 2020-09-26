import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { scale } from '../utils/scalling'

import { AlertButton } from './styles'

const Tab = createBottomTabNavigator()

import Home from '../screens/Home'
import Search from '../screens/Search'
import Report from '../screens/Report'

export default HomeTabScreen = () => {
    return (
        <Tab.Navigator 
            initialRouteName={"Home"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = 'map';
                } else if (route.name === 'Search') {
                    iconName = 'search';
                } else if (route.name === 'Report') {
                    iconName = 'bell';
                    return ( 
                        <AlertButton>
                            <Feather name={iconName} size={scale(24)} color="#ffffff" />
                        </AlertButton>
                    )

                } else if (route.name === 'Profile') {
                    iconName = 'user';
                } else if (route.name === 'Settings') {
                    iconName = 'settings';
                }

                return <Feather name={iconName} size={scale(24)} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: '#7DBFE2',
                inactiveTintColor: '#C8C8C8',
                showLabel: false,
                style: {
                    height: '8%',
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: scale(18),
                    borderTopRightRadius: scale(18),
                    marginTop: -scale(18),
                }
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Report" component={Report} />
        </Tab.Navigator>
    )
}