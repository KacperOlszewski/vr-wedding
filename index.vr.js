import React from 'react';
import { MyHttp } from './vr/utils/http';
import { thumb } from './components/thumb';
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

    http = new MyHttp();
    user = null;

    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.state = {text: 'klops'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.http.get(`/api/user/authorized`)
            .then(
                (user) => {
                    this.user = user;
                    this.state.text = user.name;
                    console.log(this.user);

                    thumb(user.fbId).then(
                        (img) => {

                            this.user.going = true;
                            this.http.post(`/api/user/going`, this.user).then(
                                (err) => {
                                    console.log('succ')
                                },
                                (err) => {
                                    console.log('error')
                                }
                            );
                        },
                        (err) => {
                            console.log('error')
                        }
                    )
                },
                (err) => {
                    console.log('Mamy błęd')
                }
            );
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
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
                    hello there
                </Text>

                <WelcomeView></WelcomeView>
            </View>
        );
    }
};

AppRegistry.registerComponent('WeddingSite', () => WeddingSite);
