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


function LoginPage({ navigation }) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [isSecureEntry, setisSecureEntry] = useState(true);

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Authenticating...",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            hp('38%')
        );
        return null;
    };

    const { login, googleLogin , facebookLogin} = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
            >
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
                <View style={styles.inputcontainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons
                            name='mail'
                            size={30}
                            color='paleturquoise'
                            style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                        </Ionicons>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCompleteType='email'
                            placeholderTextColor='black'
                            value={email}
                            onChangeText={(text) => setemail(text)}
                            autoCapitalize='none'>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setisSecureEntry((prev) => !prev);
                            }}>
                            {
                                isSecureEntry ? <Ionicons
                                    name='eye-off'
                                    size={30}
                                    color='paleturquoise'
                                    style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                                </Ionicons> : <Ionicons
                                    name='eye'
                                    size={30}
                                    color='paleturquoise'
                                    style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                                </Ionicons>
                            }
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            autoCompleteType='password'
                            placeholderTextColor='black'
                            secureTextEntry={isSecureEntry}
                            value={password}
                            onChangeText={(text) => setpassword(text)}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={{ ...styles.textStyle2, fontSize: 19, marginTop: 0 }}>
                            Forgot password ?
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.textStyle2}>Sign in</Text>
                </View>

            </LinearGradient>
            <View style={styles.container2}>
                <View >
                    <TouchableOpacity style={styles.button}
                        onPress={() => {login(email, password), 
                        showToastWithGravityAndOffset();}} >
                        <Ionicons
                            name='arrow-forward-outline'
                            size={40}
                            color='white'
                        >
                        </Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1.2 }}>
                    <Text style={{ fontFamily: 'SansitaSwashed-Regular', textAlign: 'center', fontSize: 17, color: '#33b3a6' }}>
                        Don't have an account ?{'    '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontFamily: 'SansitaSwashed-Regular', fontSize: 20, color: '#26867c' }}>
                            Signup
                        </Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'SansitaSwashed-Regular', fontSize: 18, color: '#33b3a6', marginTop: 10 }}>
                        Or login with:
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ ...styles.button2, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=>facebookLogin()}>
                                <Ionicons
                                    name='logo-facebook'
                                    size={25}
                                    color='white' >
                                </Ionicons>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.button2, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=>googleLogin()} >
                                <Ionicons
                                    name='logo-google'
                                    size={25}
                                    color='white' >
                                </Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#88DCE6',
    },
    container1: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#00ced8',
        padding: 10,
        flexDirection: 'column'
    },
    textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'white',
        fontSize: 50,

    },
    textStyle2: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'white',
        fontSize: 28,
        marginTop: 30

    },
    imagebackground: {
        marginLeft: 20,
        height: hp('10%'),
        width: wp('25%')
    },
    container2: {
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'white',
        borderTopRightRadius: 200,
        borderTopLeftRadius: 200,
        flex: 1,
    },
    inputcontainer: {
        flex: 2.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    input: {
        fontSize: 16,
        color: 'black',
        backgroundColor: 'paleturquoise',
        height: 48,
        width: wp('75%'),
        paddingLeft: 10,
        marginBottom: 25,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        elevation: 1,
        marginRight: 15,
        borderColor: 'black'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 10,
        borderRadius: 100,
        backgroundColor: '#88DCE6',
        aspectRatio: 1.1,
    },
    lineargradient: {
        flex: 1.8,
        paddingLeft: 15,
        paddingRight: 15,
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#33b3a6',
        borderRadius: 30,
        aspectRatio: 1,
        margin: 15
    }

})

export default LoginPage
