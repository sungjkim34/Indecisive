import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './app/HomeScreen';
import RestaurantScreen from './app/RestaurantScreen';

export default class App extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const { navigation } = this.props;
        return (
            <IndecisiveApp navigation={ navigation }/>
        );
    }
}

const IndecisiveApp = StackNavigator({
    Home: { screen: HomeScreen },
    Restaurant: { screen: RestaurantScreen }
},{
    headerMode: 'none'
});

// AppRegistry.registerComponent('IndecisiveApp', () => IndecisiveApp);