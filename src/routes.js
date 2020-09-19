import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Cadastro from './screens/Cadastro'
import App from './screens/home'

export default Routes = () => {
    return (
        <>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Home" component={App} />
            </AppStack.Navigator>
        </>
    );
}