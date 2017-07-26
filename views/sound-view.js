import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Sound,
    asset
} from 'react-vr';

import { Button } from '../components/button';
import { colors } from '../components/colors'

export class SoundView extends React.Component {

    constructor() {
        super();
        this.state = {
            play: "Muza?",
            playing: false,
            status: 'stop'
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 3,
                backgroundColor: colors.background,
                borderRadius: 0.2,
                layoutOrigin: [0.5, 0.5],
                padding: 0.2,
                transform: [
                    {translate: [6, 7, -8]},
                ]
            },
            text: {
                color: '#fff',
                fontSize: 0.5,
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center'
            }
        });

        this.play.bind(this);
    }


    play() {
        const state = this.state.playing ?
            {play: "Play!", playing: false, status: 'pause'} :
            {play: "Stop!", playing: true, status: 'play'};

        this.setState(state);
    }



    render() {
        return (
            <View style={this.styles.menu}>
                <Button
                    text={this.state.play}
                    callback={() => this.play()}/>

                <Sound source={{ mp3: asset('sound/need_you.mp3') }}
                       playStatus={this.state.status}/>
            </View>
        );
    }
}