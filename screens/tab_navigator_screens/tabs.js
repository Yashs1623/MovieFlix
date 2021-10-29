import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile';
import Search from './Search'
import Favourites from './Favourites'
import TopTabs from './upcoming_movies_top_nav_screen/top_tab_navigator';


const Tab = createMaterialBottomTabNavigator();

function MyTabs({route }) {
    const email = route.params.text;
    return (
        <Tab.Navigator
            initialRouteName='Profile'
            activeColor="white"
            barStyle={{ backgroundColor: '#33b3a6' }}
        >
            <Tab.Screen name="TopTabs" component={TopTabs}

                options={{
                    tabBarLabel: 'Movies',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="movie-open" color="white" size={26} />
                    ),
                }} />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="movie-search" color="white" size={26} />
                    ),
                }} />
            <Tab.Screen name="Favourites" component={Favourites}
                options={{
                    tabBarLabel: 'Favourites',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="heart-multiple" color="white" size={24} />
                    ),

                }} />
            <Tab.Screen name="Profile" component={Profile} initialParams={{ text: email }}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" color="white" size={26} />
                    ),

                }} />
        </Tab.Navigator>
    );
}
export default MyTabs