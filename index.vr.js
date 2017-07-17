import React from 'react';
import { MyHttp } from './vr/utils/http';
import { keys } from './vr/utils/localStorage';
import { UserService } from './vr/utils/userService';
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



        this.styles = StyleSheet.create({
            menu: {
                flex: 1,
                flexDirection: 'column',
                width: 1.4,
                alignItems: 'stretch',
                transform: [{translate: [2, 2, -5]}]
            }
        });
    }

    componentDidMount() {
        this.http.get(`/api/user/1234`)
            .then(
                (user) => {
                    this.user = user;
                    this.state.text = user.name;
                    console.log('user:', user)
                },
                (err) => {
                    console.log('error')
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
                <AmbientLight intensity={ 21.6 }/>
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
                <View style={this.styles.menu}>
                    <Text>
                        {this.state.text}
                    </Text>
                </View>
            </View>
        );
    }
};

AppRegistry.registerComponent('WeddingSite', () => WeddingSite);
