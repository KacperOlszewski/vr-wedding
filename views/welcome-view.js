import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Button } from '../components/button'

export class WelcomeView extends React.Component {

    constructor() {
        super();
        this.state = {
            welcomeText: "Cześć"
        };
        this.styles = StyleSheet.create({
            menu: {
                flex: 1,
                layoutOrigin: [0.5, 0.5],
                flexDirection: 'column',
                alignItems: 'stretch',
                transform: [{translate: [0, 2, -8]}]
            },
            text: {
                backgroundColor: '#777879',
                fontSize: 0.4,
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center'
            }
        });

        this.yes.bind(this);
    }

    yes() {
        const user = this.props.user;
        user.going = true;

        http.post(`/api/user/going`, user).then(
            (succ) => {
                this.props.setGoing();
                console.log('user idzie');
            },
            (err) => {
                console.log('error');
            }
        );
    }

    render() {
        const isGoing = () => {
            return this.props.willGo ?
                <Button
                    text='Tak!'
                    callback={() => this.yes()}/> :

                <Button
                    text='nie!'
                    callback={() => this.yes()}/>
        };

        return (
            <View style={this.styles.menu}>
                <Text style={this.styles.text}>
                    {this.state.welcomeText} {this.props.user.name}
                </Text>

                {isGoing()}
            </View>
        );
    }
}