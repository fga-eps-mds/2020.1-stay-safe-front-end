import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Cadastro from './screens/Cadastro'
import Login from './screens/Login'
import Home from './screens/Home'
import Settings from './screens/Settings'

export default Routes = () => {
    return (
        <>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Login}>
                {/* <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Home" component={Home} /> */}
                <AppStack.Screen name="Settings" component={Settings} />
            </AppStack.Navigator>
        </>
    );
}