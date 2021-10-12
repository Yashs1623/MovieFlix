import React, { useState } from 'react'
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
import { FlatList } from 'react-native-gesture-handler';


function Search({navigation}) {
    const [movie_search_name, setMovie_search_name] = useState('');
    const [movie_search, setMovie_search] = useState([]);
    const [ismovie_searchLoading, setmovie_searchLoading] = useState(true);


    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7a8b7aeea84e00868b69d9aafc41530b&language=en-US&query=${movie_search_name}&page=1&include_adult=true`);
            const json = await response.json();
            setMovie_search(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setmovie_searchLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity 
                    onPress={() => {
                        item.original_language == 'en' ? navigation.navigate('hollywood_movie_details',
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
            <StatusBar backgroundColor='#26867c' />
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <View style={styles.search_container}>
                    <Ionicons
                        style={{ marginLeft: 12 }}
                        name='search'
                        size={22}>
                    </Ionicons>
                    <TextInput
                        style={styles.input}
                        placeholder='Search'
                        placeholderTextColor='black'
                        value={movie_search}
                        onChangeText={(text) => {
                            setMovie_search_name(text);
                            getMovies();
                        }}>
                    </TextInput>
                </View>
                <FlatList
                    data={movie_search}
                    renderItem={renderItem}
                    numColumns={3}
                    horizontal={false}>
                </FlatList>
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
    search_container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'paleturquoise',
        height: 50,
        width: wp('92%'),
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 15,
        marginLeft: wp('4%'),
        marginTop: hp('2%'),
        marginRight: wp('4%'),
        flexDirection: 'row'
    },
    input: {
        color: 'black',
        backgroundColor: 'paleturquoise',
        marginLeft: 15,
        fontSize: 20,
        width:wp('70%')
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

export default Search

