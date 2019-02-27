import {Button, StyleSheet, Text, View, AsyncStorage, Alert, TouchableNativeFeedback} from 'react-native';
import React, {Component} from 'react';
import Metronome from "./Metronome";

export default class SyncScreen extends Component {
    constructor()
    {
        super();
        this.sync = this.sync.bind(this);
        this.state = {basis: 0};
    }
    async componentDidMount() {
        let basis = await AsyncStorage.getItem("basis");
        let numberFormBasis;
        if (!Number.isInteger(basis))
            numberFormBasis = 0;
        else
            numberFormBasis = basis;
        this.setState({
            basis: Number(basis)
        });
    }

    static navigationOptions = {
        headerTitle: "Synchronize"
    }

    render()
    {
        const basis = 0;
        return <View>
            <Metronome beats={4} basis={this.state.basis}/>
            <TouchableNativeFeedback
                onPress={this.sync}
                background={TouchableNativeFeedback.Ripple("blue",)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Synchronize Now</Text>
                </View>
            </TouchableNativeFeedback>
            <Text>{`
            Current absolute time: ${Date.now()}
            Current basis: ${String(this.state.basis)}

            `}</Text>
            {/*<TouchableNativeFeedback
                onPress={async () => {
                    const basis = await AsyncStorage.getItem("basis") || -1;
                    Alert.alert("Current stored basis:",basis);
                }}
                background={TouchableNativeFeedback.Ripple("blue",)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>See stored basis</Text>
                </View>
            </TouchableNativeFeedback>*/}
        </View>;
    }
    sync()
    {
        time = Date.now();
        AsyncStorage.setItem('basis',String(time))
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
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0db7ff',
        padding: 5,
    }
});