import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage'
import SignupPage from './screens/SignupPage'
import tabs from './screens/tab_navigator_screens/tabs'
import hollywood_movie_details from './screens/tab_navigator_screens/upcoming_movies_top_nav_screen/hollywood_movie_details';
import bollywood_and_tollywood_movie_details from './screens/tab_navigator_screens/upcoming_movies_top_nav_screen/bollywood_and_tollywood_movie_details';
import similar_movie_details from './screens/tab_navigator_screens/upcoming_movies_top_nav_screen/similar_movie_details';


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
        <Stack.Screen name='hollywood_movie_details' component={hollywood_movie_details} options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen name='bollywood_and_tollywood_movie_details' component={bollywood_and_tollywood_movie_details} options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen name='similar_movie_details' component={similar_movie_details} options={{headerShown: false}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
