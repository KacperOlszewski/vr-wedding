import React from 'react';
import { http } from './vr/utils/http';
import { WelcomeView } from './views/welcome-view';
import { InstructionView } from './views/instruction-view';
import { UsersView } from './views/users-view';
import { VideoView } from './views/video-view';

import {
    AppRegistry,
    AsyncStorage,
    asset,
    Pano,
    Text,
    View,
    AmbientLight,
    StyleSheet,
    Input,
    TextInput
} from 'react-vr';

export default class WeddingSite extends React.Component {

    constructor(props) {
        super(props);
        this.setInitialState();
        this.start();
        this.userIsGoing = this.userIsGoing.bind(this);
    }

    setInitialState() {
        this.state = {
            willGo: true,
            user: {
                name: ''
            }
        };

        this.styles = StyleSheet.create({
            view: { position: 'absolute'}
        });
    }

    userIsGoing() {
        this.setState({
            willGo: true
        });
    }

    start() {
        http.get(`/api/user/authorized`)
            .then(
                (user) => {
                    this.setState({
                        user: user,
                        willGo: user.going
                    });
                },
                (err) => {
                    console.log('Mamy błęd')
                }
            );
    }

    render() {
        const willGo = this.state.willGo;

        return (
            <View>
                <Pano source={
                    [
                        asset('wall-left.jpg'),
                        asset('wall-right.jpg'),
                        asset('wall-top.jpg'),
                        asset('wall-bottom.jpg'),
                        asset('wall-back.jpg'),
                        asset('wall-front.jpg')
                    ]
                }/>

                {willGo &&
                    <View style={this.styles.view}>
                        <InstructionView></InstructionView>
                    </View>
                }

                {willGo &&
                    <View style={this.styles.view}>
                        <VideoView></VideoView>
                    </View>
                }

                {willGo &&
                    <View style={this.styles.view}>
                        <UsersView></UsersView>
                    </View>
                }

                {!willGo &&
                    <WelcomeView
                        setGoing={this.userIsGoing}
                        user={this.state.user}>
                    </WelcomeView>
                }



            </View>
        );
    }
};

AppRegistry.registerComponent('WeddingSite', () => WeddingSite);