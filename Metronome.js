// @flow
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import clockSync from 'react-native-clock-sync';

export default class Metronome extends React.PureComponent<Props> {
    static propTypes = {
        beats: PropTypes.number.isRequired,
        basis: PropTypes.number, //the basis for time, i.e. unix time that timing is synced to
    };

    constructor()
    {
        super();
        this.tick = this.tick.bind(this);
        const clock = new clockSync({});
        //this.updateInterval = this.updateInterval.bind(this);
        this.state = {displayedBeat: 0, clock: clock}
    }

    componentDidMount() {
        const millis = this.state.clock.getTime() % 1000;
        const timeout = setTimeout(() => {
            const interval = setInterval(this.tick, 1000);
            this.setState({interval});
        },1000 - millis);
        this.setState({timeout});
    }



    render() {
        var boxes = [];
        let downbeat = this.state.displayedBeat === 0;
        for (let i=0; i<this.props.beats; ++i) {
            let style;
            let active = i === this.state.displayedBeat;
            if (downbeat)
            {
                style = active ? [styles.countBox, downbeatStyles.active] : [styles.countBox, downbeatStyles.inactive];
            }
            else
            {
                style = active ? [styles.countBox, regularBeatStyles.active] : [styles.countBox, regularBeatStyles.inactive];
            }

            boxes[i] = <View key={i} style={style}><Text style={styles.boxText}>{i+1}</Text></View>
        }
        return <View style={styles.countBoxRow}>{boxes}</View>;
    }


    tick()
    {
        //let basis = this.props.basis || 0;
        //let now = Date.now() - basis;
        let clock = this.props.clock;
        if (!clock)
        {
            clock = new clockSync({});
            this.setState({clock: clock })
        }

        const now = clock.getTime();
        this.setState({
            displayedBeat: (now / 1000 | 0 ) % this.props.beats,
        });
        requestAnimationFrame(this.tick);
    }

    componentWillUnmount()
    {
        const timeout = this.state.timeout;
        if (timeout)
        {
            clearTimeout(timeout);
        }
        const interval = this.state.interval;
        if (interval)
        {
            clearInterval(interval);
        }
    }
}

const downbeatStyles = StyleSheet.create({
    inactive: {
        backgroundColor: '#ff9285'
    },
    active: {
        backgroundColor: '#ffb4aa'
    },
});

const regularBeatStyles = StyleSheet.create({
    inactive: {
        backgroundColor: 'gray'
    },
    active: {
        backgroundColor: 'lightgray'
    },
});

const styles = StyleSheet.create({
    countBox: {
        flex: 1,
        padding: 2,
    },
    countBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxText: {
        fontSize:60,
        textAlign: 'center',
    }
});