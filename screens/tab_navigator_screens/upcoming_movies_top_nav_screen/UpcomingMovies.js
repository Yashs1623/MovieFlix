import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as api_related from '../../../constants/api_related';
function UpcomingMovies({navigation}) {
    useEffect(async () => {
        await getUpcoming_hindiMovies();
        await getUpcoming_englishMovies();
        await getUpcoming_teluguMovies();

    }, []);

    const [hindimoviedata, sethindimovieData] = useState([]);
    const [ishindimoviesLoading, sethindimoviesLoading] = useState(true);
    const [englishmoviedata, setenglishmovieData] = useState([]);
    const [isenglishmoviesLoading, setenglishmoviesLoading] = useState(true);
    const [telugumoviedata, settelugumovieData] = useState([]);
    const [istelugumoviesLoading, settelugumoviesLoading] = useState(true);
    

    const getUpcoming_hindiMovies = async () => {
        try {
            const response = await fetch(api_related.upcoming_hindi_api_url);
            const json = await response.json();
            sethindimovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            sethindimoviesLoading(false);
        }
    }

    const getUpcoming_englishMovies = async () => {
        try {
            const response = await fetch(api_related.upcoming_english_api_url);
            const json = await response.json();
            setenglishmovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setenglishmoviesLoading(false);
        }
    }

    const getUpcoming_teluguMovies = async () => {
        try {
            const response = await fetch(api_related.upcoming_telugu_api_url);
            const json = await response.json();
            settelugumovieData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            settelugumoviesLoading(false);
        }
    };
    let combinedarray = [...hindimoviedata, ...englishmoviedata, ...telugumoviedata];

    const renderItem = ({ item }) => {
        

        return (
            <View style={styles.card}>
                <TouchableOpacity  //navigation.navigate('movie_details')
                onPress={()=> {
                    item.original_language=='en'? navigation.navigate('hollywood_movie_details',
                    {
                        movie_title: item.title, 
                        movie_id: item.id,
                        release_date : item.release_date,
                        poster_path: item.poster_path,
                        movie_description: item.overview,
                        vote_average: item.vote_average,
                    }): navigation.navigate('bollywood_and_tollywood_movie_details',
                    {
                        movie_title: item.title, 
                    })
                }}>
                    <ImageBackground
                        source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.poster_path }}
                        style={item.title.length > 13 ? styles.imagebackground2 : styles.imagebackground1}
                        imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                    </ImageBackground>
                    <Text style={item.title.length > 13 ? styles.cardtitle2 : styles.cardtitle} >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <View >
                    <FlatList
                        data={combinedarray}
                        renderItem={renderItem}
                        numColumns={3}
                        horizontal={false}
                    >
                    </FlatList>
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
    },
    card: {
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 25,
        height: hp('25%'),
        width: wp('30%'),
        marginLeft: wp('2.5%'),
        marginTop: 15,

    },
    cardtitle: {
        color: '#26867c',
        fontSize: 18,
        marginTop: 0,
        marginLeft: 1

    },
    cardtitle2: {
        color: '#26867c',
        fontSize: 15,
        marginTop: 0,
        marginLeft: 0
    },
    imagebackground1: {
        height: hp('21%'),
        width: wp('30%')
    },
    imagebackground2: {
        height: hp('19%'),
        width: wp('30%')
    },

});

export default UpcomingMovies
