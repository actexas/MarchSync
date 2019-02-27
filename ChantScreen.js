//@flow

import React, {PureComponent} from 'react'
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button, TouchableNativeFeedback} from 'react-native'
import Metronome from "./Metronome";

export default class ChatScreen extends PureComponent {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'March Sync v0.2',
        }
    };

    constructor()
    {
        super();
        this.updateBasis = this.updateBasis.bind(this);
        this.navigateSync = this.navigateSync.bind(this);
        this.state = {basis: 0};
    }

    async updateBasis()
    {
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

    navigateSync()
    {
        this.props.navigation.navigate("Sync")
    }

    render() {
        return (
            <View style={styles.container}>
                <Metronome beats={4} basis={this.state.basis} style={{flex:1}}/>
                <ScrollView style={{flex:5}}>
                    <Text style={{fontSize: 27}}>{chantText}</Text>
                </ScrollView>
                <TouchableNativeFeedback
                    onPress={this.navigateSync}
                    background={TouchableNativeFeedback.Ripple("blue",)}>
                    <View>
                        <Text style={styles.syncButton}>Adjust Synchronization</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }

    async componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener("willFocus", this.updateBasis);
        await this.updateBasis();
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    syncButton: {
        textAlign: 'center',
        padding: 5
    }
});



const chantText = `
1. All animals want to live, just like us
2. All animals feel pain, [...]
3. All animals fear death
4. All animals want to be free


5. All animals want to be loved
6. All animals feel joy
7. All animals get lonely
8. All animals deserve justice


1. Their bodies, not ours
2. Their families, not ours
3. Their children, not ours
4. Their flesh, not ours


5. Their eggs, not ours
6. Their lactations, not ours
7. Their skin, not ours
8. Their lives, not ours


1. You are compassionate, just like us
2. You have reason, [...]
3. You have empathy 
4. You love animals 


1. Justice for the victims, be vegan
2. We are all animals, [...]
3. Killing is extreme 
4. Throat slitting is extreme 


Animals are here with us,
Not for us
[Repeat 4x]


Animals’ lives are their right
We have just begun to fight
[Repeat 4x]

1. All animals want to live, just like us
2. All animals feel pain, [...]
3. All animals fear death
4. All animals want to be free


5. All animals want to be loved
6. All animals feel joy
7. All animals get lonely
8. All animals deserve justice


1. Their bodies, not ours
2. Their families, not ours
3. Their children, not ours
4. Their flesh, not ours


5. Their eggs, not ours
6. Their lactations, not ours
7. Their skin, not ours
8. Their lives, not ours


1. You are compassionate, just like us
2. You have reason, [...]
3. You have empathy 
4. You love animals 


1. Justice for the victims, be vegan
2. We are all animals, [...]
3. Killing is extreme 
4. Throat slitting is extreme 


Animals are here with us,
Not for us
[Repeat 4x]


Animals’ lives are their right
We have just begun to fight
[Repeat 4x]

[END OF PART ONE]
=================

Not just dogs
Not just cats
All animals want to live
[Repeat 4x]

You have a choice
They don’t
[Repeat 4x]

Don’t buy the humane lie
Animals do not want to die
Humane slaughter is a lie
Animals do not want to die
[Repeat 2x]

It’s not food
It’s violence

Slitting throats is not food
It’s violence

Animal testing is not science
It’s violence

Leather is not fashion
It’s violence

Dairy is not food
It’s violence

It’s not food
It’s violence
[Repeat 3x]

Animals scream, animals bleed
Until every one is freed
[Repeat 4x]


Broiler chickens are killed at 40 days old
[40 days old]
Free range? [...]
Cage free? [...]
Certified humane? [...]

Pigs are killed at 6 months old
[6 months old]
Free range? [...]
Cage free? [...]
Certified humane? [...]

Cows are killed at 2 years old
[2 years old]
Free range? [...]
Cage free? [...]
Certified humane? [...]

Male egg chicks are killed at 1 day old
[1 day old]
Free range? [...]
Cage free? [...]
Certified humane? [...]

Turkeys are killed at 5 months old
[5 months old]
Free range? [...]
Cage free? [...]
Certified humane? [...]

Ducks are killed at 8 weeks old
[8 weeks old]
Free range? [...]
Cage free? [...]
Certified humane? [...]





`;