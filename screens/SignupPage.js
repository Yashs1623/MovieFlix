import React, { useContext, useState } from 'react'
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
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
import { AuthContext } from './Authentication';

function SignupPage({ navigation }) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [emailError, setemailError] = useState('');
    const [fullNameError, setfullNameError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [validpassword, setvalidpassword] = useState(true);
    const [validemail, setvalidemail] = useState(true);
    const [validfullname, setvalidfullname] = useState(true);
    const [final_namecheck, setfinalnamecheck] = useState(false);
    const [final_passwordcheck, setfinalpasswordcheck] = useState(false);
    const [final_emailcheck, setfinalemailcheck] = useState(false);
    const [isSecureEntry, setisSecureEntry] = useState(true);

    const { register } = useContext(AuthContext)

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Authenticating...",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            hp('15%')
        );
        return null;
    };

    function emailValidator() {
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let email_check = email_regex.test(email);
        if (email == '') {
            setemailError('Please  enter  an  email');
            setvalidemail(false);
            setfinalemailcheck(false);
        }
        else if (email_check == false) {
            setemailError('Please  enter  a  valid  email');
            setvalidemail(false);
            setfinalemailcheck(false);
        }
        else {
            setemailError('');
            setvalidemail(true);
            setfinalemailcheck(true);
        }
    }
    function fullNameValidator() {
        let regex = /^[a-zA-Z]{2,40}( [a-zA-Z]{3,40})+$/;
        var name_check = regex.test(fullName);
        if (fullName == '') {
            setfullNameError('Name  cannot  be  empty');
            setvalidfullname(false);
            setfinalnamecheck(false);
        }
        else if (name_check == false) {
            setfullNameError('Please  enter  your  fullname');
            setvalidfullname(false);
            setfinalnamecheck(false);
        }
        else {
            setfullNameError('');
            setvalidfullname(true);
            setfinalnamecheck(true);
        }
    }
    function passwordValidator() {
        let regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let spl_char_check = regex.test(password);
        if (password == '') {
            setpasswordError('Password  cannot  be  empty');
            setvalidpassword(false);
            setfinalpasswordcheck(false);

        }
        else if (password.length < 8) {
            setpasswordError('Minimum  password  length  should  be  8');
            setvalidpassword(false);
            setfinalpasswordcheck(false);

        }
        else if (spl_char_check == false) {
            setpasswordError('Password  should  contain  atleast  one  special  character');
            setvalidpassword(false);
            setfinalpasswordcheck(false);

        }
        else {
            setpasswordError('');
            setvalidpassword(true);
            setfinalpasswordcheck(true);
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}>
                        <Ionicons
                            name='arrow-back-outline'
                            size={42}
                            color='white'>
                        </Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 40, flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                        source={require('../assets/profile.png')}
                        style={styles.imagebackground}
                    >
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.7, marginTop: 20, justifyContent: 'flex-end' }}>
                    <Text style={styles.textStyle}>
                        Create   your
                    </Text>
                    <Text style={styles.textStyle}>
                        account
                    </Text>
                </View>
                <View style={{ flex: 2.6, marginTop: 25, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons
                            name='person'
                            size={30}
                            color='paleturquoise'
                            style={{ marginTop: 10, marginRight: 10 }}>
                        </Ionicons>
                        <TextInput
                            style={validfullname == true ? styles.trueinput : styles.input}
                            placeholder='Your fullname'
                            keyboardType='name-phone-pad'
                            onEndEditing={() => fullNameValidator()}
                            autoCompleteType='name'
                            placeholderTextColor='black'
                            value={fullName}
                            onChangeText={(text) => setfullName(text)}>
                        </TextInput>
                    </View>
                    {
                        validfullname ? null :
                            <Animatable.View animation="fadeInLeft" duration={1000}>
                                <Text style={{ fontSize: 16, color: 'red', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20, fontFamily: 'SansitaSwashed-Regular' }}>
                                    {fullNameError}
                                </Text>
                            </Animatable.View>

                    }
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons
                            name='mail'
                            size={30}
                            color='paleturquoise'
                            style={{ marginTop: 10, marginRight: 10 }}>
                        </Ionicons>
                        <TextInput
                            style={validemail == true ? styles.trueinput : styles.input}
                            placeholder='Your email'
                            onEndEditing={() => emailValidator()}
                            keyboardType='email-address'
                            autoCompleteType='email'
                            placeholderTextColor='black'
                            value={email}
                            onChangeText={(text) => setemail(text)}
                            autoCapitalize='none'>
                        </TextInput>
                    </View>
                    {
                        validemail ? null :
                            <Animatable.View animation="fadeInLeft" duration={1000}>
                                <Text style={{ fontSize: 16, color: 'red', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20, fontFamily: 'SansitaSwashed-Regular' }}>
                                    {emailError}
                                </Text>
                            </Animatable.View>
                    }
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
                            style={validpassword == true ? styles.trueinput : styles.input}
                            placeholder='Your password'
                            autoCompleteType='password'
                            onEndEditing={() => passwordValidator()}
                            placeholderTextColor='black'
                            secureTextEntry={isSecureEntry}
                            value={password}
                            onChangeText={(text) => setpassword(text)}>
                        </TextInput>
                    </View>
                    {
                        validpassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={1000}>
                                <Text style={{ fontSize: 16, color: 'red', justifyContent: 'flex-start', alignItems: 'center', fontFamily: 'SansitaSwashed-Regular' }}>
                                    {passwordError}
                                </Text>
                            </Animatable.View>

                    }
                    <TouchableOpacity style={{ marginTop: 30 }}
                        onPress={() => {
                            emailValidator();
                            passwordValidator();
                            fullNameValidator();
                            if (final_namecheck === true && final_emailcheck === true && final_passwordcheck === true) {
                                register(email, password);
                                showToastWithGravityAndOffset();
                            }
                            else {
                                return null;
                            }

                        }}>
                        <Text style={{ ...styles.textStyle, fontSize: 30 }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#88DCE6',
    },
    lineargradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    imagebackground: {
        marginLeft: 20,
        height: hp('15%'),
        width: wp('31%'),
    },
    textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        fontSize: 42,
        color: 'white',
        marginLeft: 8
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
    trueinput: {
        fontSize: 16,
        color: 'black',
        backgroundColor: 'paleturquoise',
        height: 48,
        width: wp('75%'),
        paddingLeft: 10,
        marginBottom: 40,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 25,
    }
});
export default SignupPage
