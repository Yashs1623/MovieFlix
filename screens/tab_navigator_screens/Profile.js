import React, { useState, useContext } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from './../Authentication';

function Profile({ route, navigation }) {

    const [image, setimage] = useState('https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png');
    const [fullName, setfullName] = useState('');
    const [validfullname, setvalidfullname] = useState(true);
    const [fullNameError, setfullNameError] = useState('');
    const [final_namecheck, setfinalnamecheck] = useState(false);
    const [phoneNumber, setphoneNumber] = useState('');
    const [validphoneNumber, setvalidphoneNumber] = useState(true);
    const [phoneNumberError, setphoneNumberError] = useState('');
    const [final_phoneNumbercheck, setfinal_phoneNumbercheck] = useState(false);
    const [birthdate, setbirthdate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [agecheck, setagecheck] = useState(false);
    const [age, setage] = useState('');

    const { user, logout } = useContext(AuthContext)


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setbirthdate(date);
        let tempDate = new Date(date);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setbirthdate(fDate);
        let age1 = new Date().getFullYear() - tempDate.getFullYear();
        setage(age1);
        setagecheck(true);
        hideDatePicker();

    };



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
    function phoneNumberValidator() {
        if (phoneNumber == '') {
            setphoneNumberError('Please  enter  your  mobile  number');
            setvalidphoneNumber(false);
            setfinal_phoneNumbercheck(false);
        }
        else if (phoneNumber.length != 10) {
            setphoneNumberError('Please  enter  a  correct  mobile  number');
            setvalidphoneNumber(false);
            setfinal_phoneNumbercheck(false);
        }
        else {
            setphoneNumberError('')
            setvalidphoneNumber(true);
            setfinal_phoneNumbercheck(true);
        }
    }

    bs = React.createRef();
    fall = new Animated.Value(1);

    const photofromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setimage(image.path);
            bs.current.snapTo(1);
        });
    }
    const photofromGallery = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            setimage(image.path);
            bs.current.snapTo(1);
        });
    }
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton}
                onPress={photofromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}
                onPress={photofromGallery}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>

    );
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}>
                </View>
            </View>
        </View>
    );

    return (

        <View style={styles.container} >
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <TouchableOpacity
                    style={{alignItems:'flex-end'}}
                    onPress={() => logout()}>
                    <Text style={{ fontSize: 22, marginTop:7,marginRight: 20, fontFamily: 'SansitaSwashed-Regular', color:'white' }}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
                <View style={{ marginTop:10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textStyle}>
                        Set   your   profile
                    </Text>
                </View>
                <View style={{ marginTop: 15, flex: 0.6, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <ImageBackground style={styles.imagebackground}
                            source={{ uri: image }}
                            imageStyle={{ borderRadius: 70 }}>
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'SansitaSwashed-Regular', fontSize: 18, color: 'white', marginTop: 12, marginLeft: 10 }}>Upload your photo</Text>
                </View>
                <View style={{ marginTop: 60, flex: 1.8, justifyContent: 'flex-start', alignItems: 'center' }}>
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
                    {
                        validfullname ? null :
                            <Animatable.View animation="fadeInLeft" duration={1000}>
                                <Text style={{ fontSize: 16, color: 'red', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20, fontFamily: 'SansitaSwashed-Regular' }}>
                                    {fullNameError}
                                </Text>
                            </Animatable.View>

                    }
                    <View style={{ ...styles.trueinput, justifyContent: 'center' }}>
                        <Text>
                            Email :   {route.params.text}
                        </Text>
                    </View>

                    <TextInput
                        style={validphoneNumber == true ? styles.trueinput : styles.input}
                        placeholder='Mobile no.'
                        keyboardType='number-pad'
                        onEndEditing={() => phoneNumberValidator()}
                        placeholderTextColor='black'
                        value={phoneNumber}
                        onChangeText={(text) => setphoneNumber(text)}
                    />
                    {
                        validphoneNumber ? null :
                            <Animatable.View animation="fadeInLeft" duration={1000}>
                                <Text style={{ fontSize: 16, color: 'red', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20, fontFamily: 'SansitaSwashed-Regular' }}>
                                    {phoneNumberError}
                                </Text>
                            </Animatable.View>

                    }
                    <TouchableOpacity style={{ ...styles.input, justifyContent: 'center', marginBottom: 5 }}
                        onPress={showDatePicker}>
                        <Text>
                            {"Birthdate : " + birthdate}
                        </Text>
                    </TouchableOpacity>
                    {
                        isDatePickerVisible && (
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        )
                    }
                    {
                        agecheck && (
                            <Animatable.View animation="bounceIn" duration={2000}>
                                <Text style={{ fontSize: 25, color: 'white', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15, fontFamily: 'SansitaSwashed-Regular' }}>
                                    {
                                        "Age : " + age
                                    }
                                </Text>
                            </Animatable.View>
                        )
                    }
                    <TouchableOpacity style={(validfullname == true && validphoneNumber == true) ? { marginTop: 20 } : { marginTop: 0 }}
                        onPress={() => {
                            phoneNumberValidator();
                            fullNameValidator();
                            (final_namecheck === true && final_phoneNumbercheck === true) ?
                                navigation.navigate('Login') : null
                        }}>
                        <Text style={{ ...styles.textStyle, fontSize: 30 }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

                <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                    renderContent={renderInner}
                    renderHeader={renderHeader}>
                </BottomSheet>
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
    header: {
        backgroundColor: '#FFFFFF',
        shadowRadius: 5,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    imagebackground: {
        marginLeft: 20,
        height: hp('16%'),
        width: wp('35%'),
    },
    textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        fontSize: 42,
        color: 'white',
        marginLeft: 15
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButtonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#33b3a6',
        alignItems: 'center',
        marginVertical: 7,
    },
    input: {
        color: 'black',
        backgroundColor: 'paleturquoise',
        height: hp('5.5%'),
        width: wp('75%'),
        paddingLeft: 10,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
    },
    trueinput: {
        color: 'black',
        backgroundColor: 'paleturquoise',
        height: hp('5.5%'),
        width: wp('75%'),
        paddingLeft: 10,
        marginBottom: 40,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
    }
});


export default Profile
