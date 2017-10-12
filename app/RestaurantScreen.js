import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RestaurantScreen extends Component {
    render() {
        const restaurants = this.props.navigation.state.params.restaurants;
        const randomNumber = Math.floor((Math.random() * 20));
        const restaurant = restaurants[randomNumber];
        const rating = restaurant.rating;
        const numOfFullStars = Math.floor(rating);
        let stars = [];
        for(let i = 0; i < numOfFullStars; i++) {
            stars.push(i);
        }
        const renderStars = stars.map((stars, index) =>
            <Icon key={index} name="star"/>
        );
        const numOfEmptyStars = Math.ceil(rating);
        let emptyStars = [];
        for(let i = numOfEmptyStars; i < 5; i++) {
            emptyStars.push(i);
        }
        const renderEmptyStars = emptyStars.map((stars, index) =>
            <Icon key={index} name="star-o"/>
        );
        if(restaurant) {
            return (
                <View>
                    <View style={styles.header}>
                        <Icon style={styles.backButton} onPress={() => this.props.navigation.navigate('Home')} name="chevron-left"/>
                        <Text onPress={() => this.props.navigation.navigate('Home')}>Go back</Text>
                    </View>
                    <View style={styles.container}>
                        <Text> </Text>
                        <Text> </Text>
                        <Text style={styles.title}>{restaurant.name}</Text>
                        <Image source={{uri: restaurant.image_url, width: 280, height: 280}} resizeMode="contain" style={{marginBottom:10}}/>
                        {/*<Text>Rated: {restaurant.rating}</Text>*/}
                        <View style={styles.rating}>
                            <View style={styles.stars}>
                                {renderStars}
                                {rating > numOfFullStars && <Icon name="star-half-o"/>}
                                {renderEmptyStars}
                            </View>
                            <Text> ({restaurant.review_count})</Text>
                        </View>
                        <Text>{restaurant.price}</Text>
                        <Text>Location: </Text>
                        <Text>{restaurant.location.address1} {restaurant.location.address2}</Text>
                        <Text>{restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}</Text>
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 45,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    backButton: {
        marginTop: 3,
        marginRight: 7
    },
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    rating: {
        flexDirection: 'row'
    },
    stars: {
        flexDirection: 'row',
        marginTop: 3
    }
});