import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Image, Text, Button } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
// import { Text } from "react-native-web";

const MovieLists = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  const addToFavourites = () => {
    console.log('added')
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={styles.movieItem}
        onClick={() => {
          console.log("pressed");
          navigation.navigate("Details", {
            id: item.id
          });
        }}
      >
        <Avatar
          rounded
          size="large"
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path
          }}
        />
        <View>
          <Text>Title: {item.title}</Text>
          <Text>Release Date: {item.release_date}</Text>
          <Text>Vote Average: {item.vote_average}</Text>
        </View>
        <Button
          title="Add to Favourites"
          onPress={() =>addToFavourites}
          color="#BE440C"
        />
      </View>
    );
  };
  const handleClick = item => {
    console.log(item);
  };
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
        // console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      {movies.map(item => (
        <ListItem
          key={item.id}
          bottomDivider
          onPress={() => navigation.navigate("Details", { id: item.id })}
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Title: {item.title}</ListItem.Title>
            <ListItem.Subtitle>Release Date: {item.release_date}</ListItem.Subtitle>
            <ListItem.Subtitle>Rating: {item.vote_average}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title="Add to Favourites"
            onPress={() => addToFavourites}
            color="#BE440C"
          />
        </ListItem>
      ))}
      {/*<FlatList*/}
      {/*  data={movies}*/}
      {/*  renderItem={renderItem}*/}
      {/*  keyExtractor={(item, index) => item.id.toString()}*/}
      {/*/>*/}
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
