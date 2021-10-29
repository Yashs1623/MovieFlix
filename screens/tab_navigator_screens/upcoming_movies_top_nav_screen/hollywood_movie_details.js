import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import { AirbnbRating } from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function hollywood_movie_details({ navigation, route }) {

    useEffect(async () => {
        await getVideos();
        await getgenres();
        await getCasts();
        await getsimilar_movies();
    }, []);

    const [videosData, setvideosData] = useState([]);
    const [isvideosdataLoading, setvideosdataLoading] = useState(true);
    const [genreData, setgenreData] = useState([]);
    const [isgenredataLoading, setgenredataLoading] = useState(true);
    const [castsData, setcastsData] = useState([]);
    const [iscastsdataLoading, setcastsdataLoading] = useState(true);
    const [similar_moviesData, setsimilar_moviesData] = useState([]);
    const [issimilar_moviesdataLoading, setsimilar_moviesdataLoading] = useState(true);
    const [isFavourite, setisFavourite] = useState(false);

    const movie_id = route.params.movie_id;
    const movie_title = route.params.movie_title;
    const release_date = route.params.release_date;
    const poster_path = route.params.poster_path;
    const movie_description = route.params.movie_description;
    const vote_average = route.params.vote_average / 2;



    const addFavourite = async () => {
        await ref.add({
            email: auth().currentUser.email,
            FavouriteMovieId: movie_id,
            FavouriteMovieTitle: movie_title,
            FavouriteMoviePosterPath: poster_path,
            FavouriteMovieRating: vote_average,
            FavouriteMovieReleaseDate: release_date,
            FavouriteMovieDescription: movie_description
        });
    }

    const ref = firestore().collection('Users');

    // async function removeFavourite() {
    // }

    const getVideos = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=7a8b7aeea84e00868b69d9aafc41530b&language=en-US`);
            const json = await response.json();
            setvideosData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setvideosdataLoading(false);
        }
    };

    const getgenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=7a8b7aeea84e00868b69d9aafc41530b&language=en-US`);
            const json = await response.json();
            setgenreData(json.genres);
        } catch (error) {
            console.error(error);
        } finally {
            setgenredataLoading(false);
        }
    };

    const getCasts = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=7a8b7aeea84e00868b69d9aafc41530b&language=en-US`);
            const json = await response.json();
            setcastsData(json.cast);
        } catch (error) {
            console.error(error);
        } finally {
            setcastsdataLoading(false);
        }
    }

    const getsimilar_movies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=7a8b7aeea84e00868b69d9aafc41530b&language=en-US&page=1&original_language=en`);
            const json = await response.json();
            setsimilar_moviesData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setsimilar_moviesdataLoading(false);
        }
    };



    const renderItem = ({ item }) => {
        if (item.type == 'Trailer') {
            return (
                <View style={{ height: 250, width: wp('100%'), marginTop: hp('2%') }}>
                    <YoutubePlayer
                        height={500}
                        play={true}
                        videoId={item.key}>
                    </YoutubePlayer>
                </View>
            )
        }
        else {
            return null;
        }

    }

    const renderclipsItem = ({ item }) => {
        if (item.type == 'Featurette') {
            return (
                <View>
                    <Text style={{ ...styles.movie_title_textStyle, marginTop: 2 }}>
                        Other  Clips
                    </Text>
                    <View style={{ height: 250, width: wp('100%'), marginTop: hp('2%') }}>
                        <YoutubePlayer
                            height={500}
                            play={false}
                            videoId={item.key}>
                        </YoutubePlayer>
                    </View>
                </View>
            )
        }
        else {
            return null;
        }

    }



    const rendergenreItem = ({ item, index }) => {
        if (index + 1 <= 4) {
            return (

                <View style={styles.genre_container}>
                    <Text style={{ fontFamily: 'SansitaSwashed-Regular', fontSize: 15 }}>
                        {item.name}
                    </Text>
                </View>

            )
        }
        else {
            return null;
        }

    }

    const rendercastsItem = ({ item }) => {

        return (
            <View style={styles.casts_card}>
                <ImageBackground
                    source={item.profile_path == null ? { uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } : { uri: 'https://image.tmdb.org/t/p/original/' + item.profile_path }}
                    style={item.name.length > 15 ? styles.casts_imagebackground2 : styles.casts_imagebackground1}
                    imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                </ImageBackground>
                <Text style={item.name.length > 15 ? styles.casts_cardtitle2 : styles.casts_cardtitle} >
                    {item.name}
                </Text>
                <Text style={{ ...styles.casts_cardtitle2, fontSize: 10 }} >
                    {item.character}
                </Text>

            </View>
        )
    }

    const rendersimilar_moviesItem = ({ item, index }) => {
        if (index + 1 <= 5) {
            return (
                <View style={{ ...styles.casts_card, height: 240 }}>
                    <TouchableOpacity  //navigation.navigate('movie_details')
                        onPress={() => {
                            item.original_language == 'en' ? navigation.navigate('similar_movie_details',
                                {
                                    movie_title: item.title,
                                    movie_id: item.id,
                                    release_date: item.release_date,
                                    poster_path: item.poster_path,
                                    movie_description: item.overview,
                                    vote_average: item.vote_average,
                                }) : navigation.navigate('bollywood_and_tollywood_movie_details',
                                    {
                                        movie_title: item.title,
                                    })
                        }}>
                        <ImageBackground
                            source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.poster_path }}
                            style={item.title.length > 15 ? styles.casts_imagebackground2 : styles.casts_imagebackground1}
                            imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                        </ImageBackground>
                        <Text style={item.title.length > 15 ? styles.casts_cardtitle2 : styles.casts_cardtitle} >
                            {item.title}
                        </Text>
                    </TouchableOpacity>

                </View>
            )
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <ScrollView>
                    <Text style={styles.movie_title_textStyle}>
                        {movie_title}
                    </Text>
                    <Text style={styles.movie_textStyle}>
                        Movie             {release_date}
                    </Text>
                    <View>
                        <FlatList
                            data={videosData}
                            renderItem={renderItem}
                            horizontal={true}>
                        </FlatList>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            source={{ uri: 'https://image.tmdb.org/t/p/original/' + poster_path }}
                            style={styles.movie_poster}>
                        </ImageBackground>
                        <View style={{ width: 260 }}>
                            <View style={{ height: 55 }}>
                                <FlatList
                                    data={genreData}
                                    renderItem={rendergenreItem}
                                    horizontal={true}>
                                </FlatList>
                            </View>
                            <View style={{ marginLeft: wp('3%'), marginRight: wp('3%') }}>
                                <Text style={{ color: 'white' }}>{movie_description}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <AirbnbRating
                                count={5}
                                reviewColor='white'
                                reviewSize={22}
                                reviews={["Meh", "Hmm...", "Good", "Very Good", "Amazing",]}
                                defaultRating={vote_average}
                                size={28}
                                selectedColor='#02006C'
                                unSelectedColor='paleturquoise'
                                isDisabled={true}
                            />
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                setisFavourite((prev) => !prev);
                                addFavourite();
                            }}>
                                {
                                    isFavourite ? <Ionicons
                                        name='heart'
                                        size={35}
                                        color='#02006C'
                                    >
                                    </Ionicons> : <Ionicons
                                        name='heart'
                                        size={35}
                                        color='paleturquoise'
                                    >
                                    </Ionicons>
                                }
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontFamily: 'SansitaSwashed-Regular' }}>Add  to  Favourites</Text>
                        </View>
                    </View>
                    <Text style={{ ...styles.movie_title_textStyle, marginTop: 20.0 }}>
                        Casts
                    </Text>
                    <View>
                        <FlatList
                            data={castsData}
                            renderItem={rendercastsItem}
                            horizontal={true}>
                        </FlatList>
                    </View>

                    <View>
                        <FlatList
                            data={videosData}
                            renderItem={renderclipsItem}
                            horizontal={true}
                        >
                        </FlatList>
                    </View>

                    <Text style={{ ...styles.movie_title_textStyle, marginTop: 2 }}>
                        You   Might   Also   Like...
                    </Text>
                    <View>
                        <FlatList
                            data={similar_moviesData}
                            renderItem={rendersimilar_moviesItem}
                            horizontal={true}>
                        </FlatList>
                    </View>
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
    movie_title_textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        color: 'white',
        fontSize: 27,
        marginLeft: wp('3%'),
        marginTop: hp('2%'),
    },
    movie_textStyle: {
        color: 'white',
        fontSize: 20,
        marginLeft: wp('3.5%'),
        marginTop: hp('1%'),
    },
    movie_poster: {
        width: wp('30%'),
        height: 200,
        marginLeft: wp('3.5%'),
        marginTop: hp('0.7%'),
    },
    genre_container: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'paleturquoise',
        height: 45,
        width: 110,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        marginLeft: wp('3%'),
        marginTop: hp('0.2%'),
        marginRight: wp('3%'),
    },
    casts_card: {
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 260,
        width: 155,
        marginLeft: wp('2.2%'),
        marginTop: 10,
        marginBottom: 10
    },
    casts_cardtitle: {
        color: '#26867c',
        fontSize: 20,
        marginLeft: 1

    },
    casts_cardtitle2: {
        color: '#26867c',
        fontSize: 14.3,
    },
    casts_imagebackground1: {
        height: 200,
        width: 155
    },
    casts_imagebackground2: {
        height: 200,
        width: 155
    },

});

export default hollywood_movie_details
