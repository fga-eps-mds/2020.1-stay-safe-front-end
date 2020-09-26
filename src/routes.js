import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import HomeTabBar from './navigation/HomeTabBar'
import Login from './screens/Login'
import Cadastro from './screens/Cadastro'

export default Routes = () => {
    return (
        <>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"HomeTabBar"}>
                <AppStack.Screen name="HomeTabBar" component={HomeTabBar} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
            </AppStack.Navigator>
        </>
    );
}