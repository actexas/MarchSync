/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {createStackNavigator} from 'react-navigation'
import {Platform, StyleSheet, Text, View, ScrollView, AsyncStorage, Button, Alert} from 'react-native';
import Metronome from "./Metronome";
import ChantScreen from "./ChantScreen";
import SyncScreen from "./SyncScreen";


const RootStack = createStackNavigator({
    Chants: {screen: ChantScreen},
    Sync: {screen: SyncScreen}

},
{
    initialRouteName: 'Chants'
}
);

export default class App extends Component {
    render()
    {
        return <RootStack/>
    }
}
