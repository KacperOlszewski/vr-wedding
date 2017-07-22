import React from 'react';
import { http } from './vr/utils/http';
import { WelcomeView } from './views/welcome-view';
import { InstructionView } from './views/instruction-view';
import { UsersView } from './views/users-view';
import { Thumb } from './components/thumb';

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
                        asset('wall-back.jpg'),
                        asset('wall-back.jpg'),
                        asset('wall-back.jpg'),
                        asset('wall-back.jpg'),
                        asset('wall-back.jpg'),
                        asset('wall-back.jpg')
                    ]
                }/>

                {willGo &&
                <View style={{ position: 'absolute'}}>
                    <InstructionView></InstructionView>
                </View>
                }

                {willGo &&
                    <View style={{ position: 'absolute'}}>
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