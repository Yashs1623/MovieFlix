import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



function Favourites({ navigation }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getFavourites();
    }, []);
    const getFavourites = async () => {
        const userRef = firestore().collection('Users').where('email', '==', auth().currentUser.email);
        userRef.onSnapshot(querySnapshot => {
            setUsers([]);
            querySnapshot.forEach((documentSnapshot) => {
                if (!users.includes(documentSnapshot.data().FavouriteMovieId)) {
                    setUsers(users => users.concat(documentSnapshot.data()))
                }
            });
            console.log(users);
        })
    }



    const renderItem = ({ item }) => {
        return (
            // <View style={{ alignItems: 'center', marginTop: 10 }}>
            //     <View style={{ flexDirection: 'row', width: wp('95%'), backgroundColor: 'paleturquoise', elevation: 20 }}>
            //         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            //             <ImageBackground
            //                 source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.FavouriteMoviePosterPath }}
            //                 style={styles.movie_poster}>
            //             </ImageBackground>
            //         </View>

            //         <View style={{ flexDirection: "column" }}>
            //             <View style={{ width: wp('70%') }}>
            //                 <Text style={styles.movie_title_textStyle}>{item.FavouriteMovieTitle}</Text>
            //             </View>
            //             <View style={{ alignItems: 'flex-start', marginLeft: 18 }}>
            //                 {
            //                     item.FavouriteMovieRating == 0 ?
            //                         <View>
            //                             <Text style={{ color: 'black', fontSize: 16 }}>It's an upcoming movie</Text>
            //                             <Text>Rd : {item.FavouriteMovieReleaseDate}</Text>
            //                         </View> :
            //                         <Text style={{ color: 'black', fontSize: 16 }}>
            //                             Rating : {item.FavouriteMovieRating.toFixed(1)}/5
            //                         </Text>
            //                 }

            //             </View>
            //         </View>

            //     </View>
            // </View>

            <View style={{ backgroundColor: 'paleturquoise', elevation: 20, width: wp('41%'), height: 260, marginRight: 10, marginBottom: 20, marginLeft: 20 }}>
                <TouchableOpacity  //navigation.navigate('movie_details')
                    onPress={() => {
                        navigation.navigate('hollywood_movie_details',
                            {
                                movie_title: item.FavouriteMovieTitle,
                                movie_id: item.FavouriteMovieId,
                                release_date: item.FavouriteMovieReleaseDate,
                                poster_path: item.FavouriteMoviePosterPath,
                                movie_description: item.FavouriteMovieDescription,
                                vote_average: item.FavouriteMovieRating,
                            })
                    }}>
                    <ImageBackground
                        source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.FavouriteMoviePosterPath }}
                        style={styles.movie_poster}>
                    </ImageBackground>
                    <View style={{ width: wp('41%') }}>
                        <Text style={styles.movie_title_textStyle}>{item.FavouriteMovieTitle}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                        {
                            item.FavouriteMovieRating == 0 ?
                                <View>
                                    <Text style={{ color: 'black', fontSize: 15 }}>Upcoming movie</Text>
                                    <Text style={{ color: 'black', fontSize: 15 }}>Rd: {item.FavouriteMovieReleaseDate}</Text>
                                </View> :
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ color: 'black', fontSize: 16 , marginTop:5}}>
                                        Rating :{"  "}
                                    </Text>
                                    <Text style={{fontSize: 16, color:'#000038' , marginTop:5}}>
                                        {item.FavouriteMovieRating.toFixed(1)}/5
                                    </Text>
                                </View>
                        }
                    </View>
                </TouchableOpacity >
            </View >
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{
                        color: 'white', fontFamily: 'SansitaSwashed-Regular', fontSize: 35, marginBottom: 20
                    }}>Your  Favorites</Text>
                </View>
                {
                    users.length == 0 ?
                        <View style={{ alignItems: 'center', marginTop: hp('25%') }}>
                            <ImageBackground
                                source={require('../../assets/Favorite.jpg')}
                                style={styles.imagebackground}
                                imageStyle={{ borderRadius: 120 }}>
                            </ImageBackground>
                            <View>
                                <Text style={{ color: 'white', fontFamily: 'SansitaSwashed-Regular', fontSize: 20 }}>You don't have any favorites till now  :(</Text>
                            </View>
                        </View> :
                        <FlatList
                            data={users}
                            renderItem={renderItem}
                            numColumns={2}
                            horizontal={false}>
                        </FlatList>
                }

            </LinearGradient>
        </View >
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
    movie_poster: {
        width: wp('41%'),
        height: 175,
    },
    movie_title_textStyle: {
        fontFamily: 'SansitaSwashed-Regular',
        color: '#26867c',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 2
    },
    imagebackground: {
        marginLeft: 20,
        height: hp('25%'),
        width: wp('70%'),
    },
});


export default Favourites
