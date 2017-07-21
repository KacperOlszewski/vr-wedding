import React from 'react';
import { http } from './vr/utils/http';
import { WelcomeView } from './views/welcome-view';

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

    constructor() {
        super();
        this.getInitialState();

        this.userIsGoing = this.userIsGoing.bind(this);
    }

    getInitialState() {
        this.state = {
            willGo: false,
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

    componentDidMount() {
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

        const renderView = () => {
            if (!this.state.willGo) {
                return <WelcomeView
                    setGoing={this.userIsGoing}
                    willGo={this.state.willGo}
                    user={this.state.user}></WelcomeView>
            }
        };

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

                <Text style={{
                    backgroundColor: '#777879',
                    fontSize: 0.6,
                    fontWeight: '400',
                    layoutOrigin: [0.5, 0.5],
                    paddingLeft: 0.2,
                    paddingRight: 0.2,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    transform: [
                        {translate: [0, 0, 3]},
                        {rotateY: -180},
                    ]
                }}>
                    hello world {this.state.user.name}
                </Text>

                {renderView()}

            </View>
        );
    }
};

AppRegistry.registerComponent('WeddingSite', () => WeddingSite);
