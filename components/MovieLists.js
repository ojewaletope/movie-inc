import React, { useState, useEffect } from "react";
import {View, FlatList, StyleSheet, Image,  Button, TouchableOpacity, ActivityIndicator} from "react-native";
import { AsyncStorage } from 'react-native';
import { Avatar, ListItem, Card, Text } from "react-native-elements";
// import { Text } from "react-native-web";

const MovieLists = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([])
    useEffect(() => {
        const url =
            "https://api.themoviedb.org/3/movie/now_playing?api_key=9b12df64d55afae8168300b64560b87d&language=en-US&page=1";
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const sortedArr = res.results.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                // console.log(sortedArr);
                setMovies(sortedArr);
                _retrieveData()
                // console.log(this.state);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const addToFavorites = async (data) => {
        if (favourites.length > 0) {
            const value = await AsyncStorage.getItem("favourites");
            const favs = JSON.parse(value);
            favs.push(data);
            console.log(favs);
            await AsyncStorage.setItem("favourites", JSON.stringify(favs));
        } else {
            try {
                let favs = [];
                favs.push(item);
                await AsyncStorage.setItem("favourites", JSON.stringify(favs));
            } catch (e) {}
        }
    };

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("favourites");
            if (value !== null) {
                // We have data!!
                setFavourites(value);
                console.log(favourites, "line 47");
            }
        } catch (error) {
            // Error retrieving data
        }
    };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
          allowFontScaling={false}
        onPress={() => {
          navigation.navigate("Details", {
            id: item.id
          });
        }}
      >
       <Card>
         <Card.Image
             rounded
             size="large"
             source={{
               uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path
             }}
         />

           <Card.Title h4>Title: {item.title}</Card.Title>
           <Text>Release Date: {item.release_date}</Text>
           <Text>Vote Average: {item.vote_average}</Text>
         <Button
             title="Add to Favourites"
             onPress={() => addToFavorites(item)}
             color="#BE440C"
         />
       </Card>
      </TouchableOpacity>
    );
  };
  const handleClick = item => {
    console.log(item);
  };


  return (
    <View>
        <Text h3 h3Style={{textAlign: 'center'}}>Movies Now Playing</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    padding: 5,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#BE440C",
    backgroundColor: "#fff",
    color: "#BE440C",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    alignSelf: "center"
  }
});
export default MovieLists;
