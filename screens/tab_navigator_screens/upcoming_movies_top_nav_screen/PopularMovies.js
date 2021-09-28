import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as api_related from '../../../constants/api_related';


function PopularMovies() {
    useEffect(async () => {
        await getPopular_hindiMovies();
        await getPopular_englishMovies();
        await getPopular_teluguMovies();
    }, []);


    const [hindimoviedata, sethindimovieData] = useState([]);
    const [ishindimoviesLoading, sethindimoviesLoading] = useState(true);
    const [englishmoviedata, setenglishmovieData] = useState([]);
    const [isenglishmoviesLoading, setenglishmoviesLoading] = useState(true);
    const [telugumoviedata, settelugumovieData] = useState([]);
    const [istelugumoviesLoading, settelugumoviesLoading] = useState(true);

    const getPopular_hindiMovies = async () => {
        try {
            const response = await fetch(api_related.popular_hindi_api_url);
            const json = await response.json();
            sethindimovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            sethindimoviesLoading(false);
        }
    }

    const getPopular_englishMovies = async () => {
        try {
            const response = await fetch(api_related.popular_english_api_url);
            const json = await response.json();
            setenglishmovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setenglishmoviesLoading(false);
        }
    }

    const getPopular_teluguMovies = async () => {
        try {
            const response = await fetch(api_related.popular_telugu_api_url);
            const json = await response.json();
            settelugumovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            settelugumoviesLoading(false);
        }
    }

    const renderItem = ({ item, index }) => {
        if (index + 1 <= 15) {
            return (
                <View style={styles.popular_card}>
                    <ImageBackground
                        source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.poster_path }}
                        style={item.title.length > 17 ? styles.popular_imagebackground2 : styles.popular_imagebackground1}
                        imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                    </ImageBackground>
                    <Text style={item.title.length > 17 ? styles.popular_cardtitle2 : styles.popular_cardtitle} >
                        {item.title}
                    </Text>
                </View>
            );
        }
        else {
            null;
        }
    };


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <ScrollView>
                    <Text style={styles.textStyle}>
                        Bollywood
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={hindimoviedata}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                    />
                    <Text style={styles.textStyle}>
                        Hollywood
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={englishmoviedata}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                    />
                    <Text style={styles.textStyle}>
                        Tollywood
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={telugumoviedata}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                    />
                </ScrollView>
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
    },
    textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'white',
        fontSize: 27,
        marginLeft: wp('3%'),
        marginTop: hp('1%'),
    },
    popular_card: {
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 100,
        height: hp('30%'),
        width: wp('42%'),
        marginLeft: wp('2.2%'),
        marginTop: 15,
        marginBottom: 10
    },
    popular_cardtitle: {
        color: '#26867c',
        fontSize: 20,
        marginLeft: 1

    },
    popular_cardtitle2: {
        color: '#26867c',
        fontSize: 17,
    },
    popular_imagebackground1: {
        height: hp('26%'),
        width: wp('42%')
    },
    popular_imagebackground2: {
        height: hp('24%'),
        width: wp('42%')
    },
});

export default PopularMovies;

