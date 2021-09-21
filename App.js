import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage'
import SignupPage from './screens/SignupPage'
import tabs from './screens/tab_navigator_screens/tabs'

const Stack = createStackNavigator();
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
        <Stack.Screen name='Login' component={LoginPage} options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen name='Signup' component={SignupPage} options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen name='MyTabs' component={tabs} options={{headerShown: false}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
