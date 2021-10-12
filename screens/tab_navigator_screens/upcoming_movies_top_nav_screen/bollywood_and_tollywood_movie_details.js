import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



function bollywood_and_tollywood_movie_details({ route }) {
    const movie_title= route.params.movie_title;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>

                <ScrollView>
                    <Text>
                        {movie_title}
                    </Text>
                </ScrollView>
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

});

export default bollywood_and_tollywood_movie_details
