import React from 'react';
import {
    View,
    MediaPlayerState,
    Video,
    VideoControl,
    asset
} from 'react-vr';


export class VideoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerState: new MediaPlayerState({autoPlay: false, muted: false})
        };
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
                            {translate: [6, 2, 2]},
                            {rotateY: -90},
                        ]
                    }}>
                    <Video
                        style={{
                            height: 5,
                            width: 2.75,
                            borderColor: 'rgba(0,0,0,0.4)',
                            borderWidth: 0.04
                        }}
                        source={asset('video/wtf1.mp4', {format: 'mp4'})}
                        playerState={this.state.playerState}
                    />
                    <VideoControl style={{height: 0.2, width: 2.75}} playerState={this.state.playerState} />
                </View>
            </View>
        );
    }
}