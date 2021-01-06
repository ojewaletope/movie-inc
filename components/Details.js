import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { Rating, Avatar, ListItem } from 'react-native-elements';
// import {FlatList} from "react-native-web";
// import StarRating from 'react-native-star-rating';
// import {Text} from "react-native-web";

const Details = ({ route }) => {
    // console.log(route.params.id);
    const id = route.params.id;
    const [data, setData] = useState({});
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=9b12df64d55afae8168300b64560b87d&language=en-US&page=1`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSimilar(data.results)
            })
    }, []);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=9b12df64d55afae8168300b64560b87d&language=en-US`;
        fetch(url)
            .then(res => res.json())
            .then(data => {

                setData(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const renderItem = ({item}) => {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    }

    const renderSimilar = ({item}) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        )
    }

    const onStarRating = (rating) => {
        console.log(rating)
    }
    const addToFavorites = ()=> {
        console.log('clicked')
    }
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Avatar

                    size="xlarge"
                    source={{uri: "https://image.tmdb.org/t/p/w500/" + data?.poster_path}}
                />
                <Text>Title: {data.title}</Text>
                <Text>Release Year: {data.release_date?.substr(0, 4)}</Text>
                <Text>Overview: {data.overview}</Text>
                {/*<Text>Rating: {data.vote_average}*/}
                {/*</Text>*/}
                <Rating
                    showRating
                    onFinishRating={onStarRating}
                    ratingCount={10}
                    imageSize={20}
                    fractions={1}
                    count={10}
                    startingValue={data.vote_average}
                    ratingColor="#BE440C"
                    ratingTextColor="#BE440C"

                />
                <Text style={styles.genre}>Genres:</Text>
                <View style={styles.genreItem}>
                    <FlatList
                        data={data.genres}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                </View>
                <Button
                    title='Add to Favourites'
                    onPress={() => addToFavorites}
                    color="#BE440C"
                />
            </View>
            <View style={styles.similar}>
                <Text style={styles.genre}>
                    Similar Movies:
                </Text>
                <View>
                    {similar.map(item => (
                        <ListItem key={item.id} bottomDivider>
                            <Avatar source={{uri: "https://image.tmdb.org/t/p/w500/" + item?.poster_path}}/>
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                    {/*<FlatList*/}
                    {/*    data={similar}*/}
                    {/*    renderItem={renderSimilar}*/}
                    {/*    keyExtractor={(item, index) => item.id.toString()}*/}
                    {/*/>*/}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    wrapper: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#BE440C",
        borderRadius: 6,
        backgroundColor: '#fff',
        color: '#BE440C',
        marginBottom: 10
    },
    overview: {
        textAlign: 'justify',
        // lineHeight: '1.5em'
    },
    genre: {
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    genreItem: {
        marginBottom: 10
    },
    similar: {
        backgroundColor: '#fff',
        padding: 10
    }
});

export default Details;
