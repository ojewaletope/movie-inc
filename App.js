import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MovieLists from "./components/MovieLists";
import Details from "./components/Details";
import HomeScreen from "./components/HomeScreen";

const Stack = createStackNavigator();
 function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Lists" component={MovieLists} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    // <View style={styles.container}>
    //  <MovieLists/>
    // </View>
  );
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
