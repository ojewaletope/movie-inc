import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import { Avatar, ListItem, Card, Text } from "react-native-elements";
// import {FlatList} from "react-native-web";
import StarRating from "react-native-star-rating";
import axios from "axios";
// import {Text} from "react-native-web";

const Details = ({ route, navigation }) => {
  // console.log(route.params.id);
  const id = route.params.id;
  const [data, setData] = useState({});
  const [similar, setSimilar] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [favourites, setFavourites] = useState([]);

  const setAndSaveRatingValue = (rating, id) => {
    setRatingValue(rating);
    const url = `
https://api.themoviedb.org/3/movie/${id}/rating?api_key=9b12df64d55afae8168300b64560b87d&guest_session_id=1d53d0f3c1d8e997ba341bb01f37e1b1`;
    axios
      .post(url, { value: rating })
      .then(res => Alert.alert("Success", res.data?.status_message))
      .catch(err => Alert.alert("Error", err.data.status_message));
  };
  const addToFavorites = async data => {
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
          const favs = JSON.parse(value)
        setFavourites(favs);
        console.log(favourites.length, "line 47");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=9b12df64d55afae8168300b64560b87d&language=en-US&page=1`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSimilar(data.results);
      });
  }, []);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=9b12df64d55afae8168300b64560b87d&language=en-US`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setRatingValue(data.vote_average);
        _retrieveData();
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderSimilar = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <Avatar
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + item?.poster_path
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={{ marginBottom: 10 }}>
        <Card.Title h3>{data.title}</Card.Title>
        <Card.Image
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + data?.poster_path
          }}
        />
        <Text>Release Year: {data.release_date?.substr(0, 4)}</Text>
        <Text>Overview: {data.overview}</Text>
        <Text>Rating: {ratingValue}</Text>
        <StarRating
          disabled={false}
          maxStars={10}
          rating={ratingValue}
          starSize={15}
          selectedStar={rating => setAndSaveRatingValue(rating, data.id)}
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
          title="Add to Favourites"
          onPress={() => addToFavorites(data)}
          color="#BE440C"
        />
      </Card>

      <Card style={styles.similar}>
        <Card.Title style={styles.genre}>Similar Movies:</Card.Title>
        <View>
          <FlatList
            data={similar}
            renderItem={renderSimilar}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  wrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#BE440C",
    borderRadius: 6,
    backgroundColor: "#fff",
    color: "#BE440C",
    marginBottom: 10
  },
  overview: {
    textAlign: "justify"
    // lineHeight: '1.5em'
  },
  genre: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  genreItem: {
    marginBottom: 10
  },
  similar: {
    backgroundColor: "#fff",
    padding: 10
  }
});

export default Details;
