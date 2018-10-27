import {Button,StyleSheet,Text,View, AsyncStorage, Alert} from 'react-native';
import React, {PureComponent} from 'react';
import Metronome from "./Metronome";

export default class SyncScreen extends PureComponent {
    constructor()
    {
        super();
        this.sync = this.sync.bind(this);
        this.setState({basis: 0})
    }
    async componentDidMount() {
        const basis = AsyncStorage.getItem("basis") || 0;
        this.setState({
            basis: basis
        })
    }

    render()
    {
        const basis = 0;
        return <View>
            <Metronome beats={4} basis={basis}/>
            <Button title={"Synchronize Now"} onPress={this.sync}/>
        </View>;
    }
    sync()
    {
        const { navigation } = this.props;
        time = Date.now();
        AsyncStorage.setValue('basis',time)
            .catch(error => {
                Alert.alert("Synchronization Error",
                    `There was an error performing the synchronization. Ensure the app has storage access and try again.
                    Error specifics: ${error}
                    `)
            })
            .then(() => {
                this.setState({
                    basis: time
                });
            })
    }
}