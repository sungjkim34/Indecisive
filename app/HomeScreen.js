import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { getZipcode, getBusinesses } from '../services/geoApi';
import { Bubbles } from 'react-native-loader';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: false,
            zipCode: null,
            isLoading: false
        };
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
    }

    getCurrentPosition() {
        this.setState({isLoading: true});
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getZipcode(position.coords.latitude, position.coords.longitude).then((zipCode) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: false,
                        isLoading: false,
                        zipCode: zipCode
                    });
                });
            },
            (error) => this.setState({ error: error.message, isLoading: false }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    getRestaurant(zipCode){
        if(zipCode === null){
            this.setState({ error: 'Error: Zip code required.' });
        }
        else{
            this.setState({ isLoading: true, error: false });
            // getBusinesses(zipCode).then(response => {
            //     response.json().then(res => {
            //         // console.log(res);
            //         this.setState({ isLoading: false });
            //         this.props.navigation.navigate('Restaurant', { restaurants: res.businesses });
            //     });
            // });
            getBusinesses(zipCode).then(zipCode =>
            {
                if(zipCode.ok) {
                    return zipCode.json();
                } else {
                    this.setState({ error: zipCode.status });
                }
            }).then(response => {
                if(response){
                    this.setState({ isLoading: false });
                    this.props.navigation.navigate('Restaurant', { restaurants: response.businesses });
                }
            }).catch((error => {
                this.setState({ error: error.message });
            }));
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/bg_image.jpg')} style={styles.backgroundImage}>
                    <View style={styles.content}>
                        <Image source={require('../images/logo.png')} resizeMode="contain" style={{width:250}}/>
                        <Text style={styles.tagline}>We'll do the hard choosing</Text>
                        <Text style={{color: 'red'}}>{this.state.error}</Text>
                        <Text style={{color: 'white'}}>Enter your zip code:</Text>
                        {this.state.isLoading && <Bubbles size={15} color="#FFF" />}
                        <View style={styles.inputContainer}>
                            <TextInput keyboardType='numeric' underlineColorAndroid="transparent" onChangeText={(zipCode) => this.setState({zipCode})} maxLength={5} style={styles.zipCodeInput} value={this.state.zipCode} placeholder="Zip Code"/>
                        </View>
                        <Icon.Button name="check" onPress={() => this.getRestaurant(this.state.zipCode)} >Pick For Me!</Icon.Button>
                        <Text></Text>
                        <Icon.Button name="location-arrow" onPress={this.getCurrentPosition}>Get Location</Icon.Button>
                        {/*<Text style={{color: "white"}}>{this.state.latitude} | {this.state.longitude}</Text>*/}
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    zipCodeInput: {
        width: 80,
        height: 30,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    logo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'

    },
    tagline: {
        color: 'white',
        marginBottom: 20
    }
});