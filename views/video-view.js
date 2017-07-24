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
                        alignItems: 'center',
                        layoutOrigin: [0.5, 0.5],
                        transform: [
                            {translate: [6, 0, 0]},
                            {rotateY: -90},
                        ]
                    }}>
                    <Video
                        style={
                            {height: 5, width: 2.75}
                        }
                        source={asset('video/wtf1.mp4', {format: 'mp4'})}
                        playerState={this.state.playerState}
                    />
                    <VideoControl style={{height: 0.4, width: 4}} playerState={this.state.playerState} />
                </View>
            </View>
        );
    }
}