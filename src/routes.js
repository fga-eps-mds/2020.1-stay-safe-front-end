import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Cadastro from './screens/Cadastro'
import Login from './screens/Login'
import Home from './screens/Home'
import Occurrence from './screens/Occurrence'

export default Routes = () => {
    return (
        <>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Login}>
                <AppStack.Screen name="Occurrence" component={Occurrence} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home" component={Home} />
            </AppStack.Navigator>
        </>
    );
}