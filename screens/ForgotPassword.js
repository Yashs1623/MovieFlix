import React, { useState, useContext } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Text,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './Authentication';


function ForgotPassword({ navigation }) {
    const [email, setemail] = useState('');
    const { forgotPassword } = useContext(AuthContext)
    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Please check your email",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            hp('15%')
        );
        return null;
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}>
                    <Ionicons
                        name='arrow-back-outline'
                        size={42}
                        color='white'
                        style={{ marginLeft: 10, marginTop: 10 }}>
                    </Ionicons>
                </TouchableOpacity>
                <View style={styles.container1}>

                    <Text style={styles.textStyle}>
                        MovieFlix
                    </Text>
                    <ImageBackground
                        source={require('../assets/popcorns.jpg')}
                        style={styles.imagebackground}
                        imageStyle={{ borderRadius: 100 }}>
                    </ImageBackground>
                </View>
                <View style={{ justifyContent: 'center', flex: 1,alignItems:'center' , marginBottom: 160,}}>
                    <View style={styles.box}>
                        <Text style={styles.textStyle2}>
                            Forgot  Password  ?
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                name='mail'
                                size={35}
                                color='#33b3a6'
                                style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                            </Ionicons>
                            <TextInput
                                style={styles.input}
                                placeholder='Enter your registered email'
                                keyboardType='email-address'
                                autoCompleteType='email'
                                placeholderTextColor='black'
                                value={email}
                                onChangeText={(text) => setemail(text)}
                                autoCapitalize='none'>
                            </TextInput>
                        </View>
                        <TouchableOpacity
                            onPress={() =>{ forgotPassword(email);
                            showToastWithGravityAndOffset();}}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 17, color: 'black' }}>
                                    Send Email
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#88DCE6',
    },
    lineargradient: {
        flex: 1,
    },
    textStyle2: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'black',
        fontSize: 23,
        marginBottom: 30,
        marginRight: 80
    },
    input: {
        fontSize:16,
        color: 'black',
        backgroundColor: '#d8f9ff',
        height: 50,
        width: wp('75%'),
        paddingLeft: 10,
        marginBottom: 25,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        elevation: 1,
        marginRight:15,
        borderColor:'black'
    },
    button: {
        backgroundColor: '#d8f9ff',
        height: 30,
        width: 120,
        borderWidth: 0.5,
        borderColor: 'white',
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop:20,
        borderColor:'black'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#b1f2ff',
        height:300,
        borderRadius:30,
        marginBottom:30,
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'white',
        fontSize: 50,

    },
    imagebackground: {
        marginLeft: 20,
        height: hp('10%'),
        width: wp('25%')
    },
});

export default ForgotPassword

