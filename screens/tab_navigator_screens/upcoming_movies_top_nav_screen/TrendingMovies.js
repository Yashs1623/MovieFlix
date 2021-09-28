import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as api_related from '../../../constants/api_related';

function TrendingMovies() {
    useEffect(async () => {
        await getTopTrending_Movies();
        await getTrending_Movies_page2();
        await getTrending_Movies_page3();
    }, []);

    const [toptrendingmovies, settoptrendingmoviedata] = useState([]);
    const [istoptrendingmoviesLoading, settoptrendingmoviesLoading] = useState(true);
    const [trendingmovies2, settrendingmoviedata2] = useState([]);
    const [istrendingmoviesLoading2, settrendingmoviesLoading2] = useState(true);
    const [trendingmovies3, settrendingmoviedata3] = useState([]);
    const [istrendingmoviesLoading3, settrendingmoviesLoading3] = useState(true);

    const getTopTrending_Movies = async () => {
        try {
            const response = await fetch(api_related.top_trending_api_url);
            const json = await response.json();
            settoptrendingmoviedata(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            settoptrendingmoviesLoading(false);
        }
    };
    const getTrending_Movies_page2 = async () => {
        try {
            const response = await fetch(api_related.trending_api_url2);
            const json = await response.json();
            settrendingmoviedata2(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            settrendingmoviesLoading2(false);
        }
    };
    const getTrending_Movies_page3 = async () => {
        try {
            const response = await fetch(api_related.trending_api_url3);
            const json = await response.json();
            settrendingmoviedata3(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            settrendingmoviesLoading3(false);
        }
    };
    let combinedArray= [...trendingmovies2, ...trendingmovies3]

    const renderItem = ({ item, index }) => {
        if (index + 1 <= 10) {
            return (
                <View style={styles.top_trending_card}>
                    <ImageBackground
                        source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.poster_path }}
                        style={item.title.length > 13 ? styles.top_trending_imagebackground2 : styles.top_trending_imagebackground1}
                        imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                    </ImageBackground>
                    <Text style={item.title.length > 13 ? styles.top_trending_cardtitle2 : styles.top_trending_cardtitle} >
                        {item.title}
                    </Text>
                </View>
            );
        }
        else {
            null;
        }
    };

    const renderItem2 = ({ item }) => {

        return (
            <View style={styles.trendingmovie_card}>
                <ImageBackground
                    source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.poster_path }}
                    style={item.title.length > 15 ? styles.trendingmovie_imagebackground2 : styles.trendingmovie_imagebackground1}
                    imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                </ImageBackground>
                <Text style={item.title.length > 15 ? styles.trendingmovie_cardtitle2 : styles.trendingmovie_cardtitle} >
                    {item.title}
                </Text>
            </View>
        );
    };
    const getHeader = (heading) => (
        <Text style={styles.textStyle}>
            {heading}
        </Text>
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#26867c', '#33b3a6', '#88DCE6']}
                style={styles.lineargradient}
                end={{ x: 0, y: 0.7 }}>
                <Text style={styles.textStyle}>
                    Top  Trending  Movies
                </Text>
                <View>
                    <FlatList
                        data={toptrendingmovies}
                        renderItem={renderItem}
                        horizontal={true}>
                    </FlatList>
                </View>
                
                    <FlatList
                        data={combinedArray}
                        renderItem={renderItem2}
                        numColumns={3}
                        horizontal={false}
                        ListHeaderComponent={getHeader("Other  Trending  Movies")}>
                    </FlatList>


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
    top_trending_card: {
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 100,
        height: hp('27%'),
        width: wp('42%'),
        marginLeft: wp('2.2%'),
        marginTop: 15,
        marginBottom:10
    },
    top_trending_cardtitle: {
        color: '#26867c',
        fontSize: 20,
        marginLeft: 1

    },
    top_trending_cardtitle2: {
        color: '#26867c',
        fontSize: 14.3,
    },
    top_trending_imagebackground1: {
        height: hp('23%'),
        width: wp('42%')
    },
    top_trending_imagebackground2: {
        height: hp('21%'),
        width: wp('42%')
    },
    trendingmovie_card: {
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 25,
        height: hp('25%'),
        width: wp('30%'),
        marginLeft: wp('2.5%'),
        marginTop: 15,

    },
    trendingmovie_cardtitle: {
        color: '#26867c',
        fontSize: 18,
        marginTop: 0,
        marginLeft: 1

    },
    trendingmovie_cardtitle2: {
        color: '#26867c',
        fontSize: 15,
        marginTop: 0,
        marginLeft: 0
    },
    trendingmovie_imagebackground1: {
        height: hp('21%'),
        width: wp('30%')
    },
    trendingmovie_imagebackground2: {
        height: hp('19%'),
        width: wp('30%')
    },
});

export default TrendingMovies;
