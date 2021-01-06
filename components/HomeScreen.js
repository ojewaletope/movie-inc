import React from 'react'
import {View, Text, Button, StyleSheet} from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>Welcome to Movie Inc App</Text>
            <Button color="#BE440C" title='View Movies' onPress={() => navigation.navigate('Lists')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10
    },
    containerText: {
        marginBottom: 30,
        fontSize: 30,
        textAlign: 'center'
    }
})
export default HomeScreen
