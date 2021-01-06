import React from 'react'
import {View, Text, Button, StyleSheet} from "react-native";
import {Card, Avatar} from "react-native-elements";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Avatar rounded title="MI" size="xlarge" activeOpacity={0.7}/>
            <Card >
                <Card.Title style={styles.containerText}>Welcome to Movie Inc App</Card.Title>
                <Button color="#BE440C" title='View Movies' onPress={() => navigation.navigate('Lists')}/>
            </Card>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        padding: 10
    },
    containerText: {
        marginBottom: 30,
        fontSize: 30,
        textAlign: 'center'
    }
})
export default HomeScreen
