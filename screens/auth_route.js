import React, { useContext, useState, useEffect } from 'react'
import MyTabs_navigation from './Mytabs_navigation';
import LoginPage_navigation from './LoginPage_navigation'
import {ToastAndroid} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from './Authentication'
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

function Auth_route() {

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    const [user, setUser] = useState(AuthContext);
    const [initializing, setInitializing] = useState(true);

   if(initializing) return null;



    return (
        <NavigationContainer independent={true}>
            {user ? <MyTabs_navigation user_info={user} /> : <LoginPage_navigation />}
        </NavigationContainer>
    )
}

export default Auth_route
