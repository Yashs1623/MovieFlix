import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useState, useEffect, createContext } from 'react'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MyTabs from './tab_navigator_screens/tabs';
import hollywood_movie_details from './tab_navigator_screens/upcoming_movies_top_nav_screen/hollywood_movie_details';
import bollywood_and_tollywood_movie_details from './tab_navigator_screens/upcoming_movies_top_nav_screen/bollywood_and_tollywood_movie_details';
import similar_movie_details from './tab_navigator_screens/upcoming_movies_top_nav_screen/similar_movie_details';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './Authentication';
import * as user_info from './auth_route'

const Stack = createStackNavigator();


function MyTabs_navigation({user_info}) {
    const email= user_info.email

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName= "MyTabs">
                <Stack.Screen name='MyTabs' component={MyTabs} options={{ headerShown: false }} initialParams = {{text : email}}>
                </Stack.Screen>
                <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }}>
                </Stack.Screen>
                <Stack.Screen name='Signup' component={SignupPage} options={{ headerShown: false }}>
                </Stack.Screen>
                <Stack.Screen name='hollywood_movie_details' component={hollywood_movie_details} options={{ headerShown: false }}>
                </Stack.Screen>
                <Stack.Screen name='bollywood_and_tollywood_movie_details' component={bollywood_and_tollywood_movie_details} options={{ headerShown: false }}>
                </Stack.Screen>
                <Stack.Screen name='similar_movie_details' component={similar_movie_details} options={{ headerShown: false }}>
                </Stack.Screen>    
            </Stack.Navigator>
        </NavigationContainer>


    )
}

export default MyTabs_navigation
