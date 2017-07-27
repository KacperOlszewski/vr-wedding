import React from 'react';
import {
    View,
    MediaPlayerState,
    Video,
    VideoControl,
    asset,
    VrButton
} from 'react-vr';

import { colors } from '../components/colors';

export class VideoView extends React.Component {

    triggered = false;

    constructor(props) {
        super(props);
        this.state = {
            playerState: new MediaPlayerState({autoPlay: false, muted: false}),
            zoom: -27,
            x: 11,
            y: 17.6,
            rotate: 111

        };

        this.triggerPlayer.bind(this);
    }

    triggerPlayer () {
        if (this.triggered) return;

        this.setState({
            zoom: -4,
            rotate: 132,
            x: 3.6,
            y: 1.1
        });
        this.state.playerState.play();
        this.triggered = true;
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        backgroundColor: colors.background,
                        borderRadius: 0.14,
                        layoutOrigin: [0.5, 0.5],
                        padding: 0.2,
                        alignItems: 'center',
                        transform: [
                            {translate: [this.state.zoom, this.state.y, this.state.x]},
                            {rotateY: this.state.rotate}
                        ]
                    }}>
                    <VrButton onClick={() => this.triggerPlayer()}>
                        <Video
                            style={{
                                height: 4.8,
                                width: 2.75
                            }}
                            source={asset('video/wtf1.mp4', {format: 'mp4'})}
                            playerState={this.state.playerState}
                        />
                        <VideoControl style={{height: 0.4, width: 2.75}} playerState={this.state.playerState} />
                    </VrButton>
                </View>
            </View>
        );
    }
}