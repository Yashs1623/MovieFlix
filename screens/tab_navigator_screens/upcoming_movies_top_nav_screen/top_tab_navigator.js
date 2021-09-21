import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LatestMovies from './LatestMovies'
import UpcomingMovies from './UpcomingMovies'
import TrendingMovies from './TrendingMovies'
const Tab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Upcoming" component={UpcomingMovies} />
      <Tab.Screen name="Trending"  component={TrendingMovies} />
      <Tab.Screen name="Latest" component={LatestMovies} />
    </Tab.Navigator>
  );
}

export default TopTabs