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
            rotate: 122,
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
                        backgroundColor: 'rgba(0,0,0,0.26)',
                        borderRadius: 0.2,
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
                                height: 5,
                                width: 2.75,
                                borderColor: colors.primaryAlpha,
                                borderWidth: 0.04
                            }}
                            source={asset('video/wtf1.mp4', {format: 'mp4'})}
                            playerState={this.state.playerState}
                        />
                        <VideoControl style={{height: 0.3, width: 2.75}} playerState={this.state.playerState} />
                    </VrButton>
                </View>
            </View>
        );
    }
}