import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Button } from '../components/button'

export class WelcomeView extends React.Component {

    constructor() {
        super();
        this.state = {
            welcomeText: "Cześć",
            bounceValue: new Animated.Value(1),
            bounceOut: new Animated.Value(0.8)
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 6,
                backgroundColor: 'rgba(0,0,0,0.26)',
                borderRadius: 0.2,
                layoutOrigin: [0.5, 0.5],
                padding: 0.2,
                transform: [
                    {translate: [0, 0, -8]},
                    {scale: this.state.bounceValue}
                ]
            },
            text: {
                color: '#fff',
                fontSize: 0.5,
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center'
            }
        });

        this.yes.bind(this);
    }

    componentDidMount() {
        this.state.bounceValue.setValue(1.2);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1,
                friction: 1,
                duration: 350
            }
        ).start();
    }

    yes() {
        const user = this.props.user;
        user.going = true;

        http.post(`/api/user/going`, user).then(
            (succ) => {
                Animated.timing(
                    this.state.bounceValue,
                    {
                        toValue: 0.01,
                        duration: 360
                    }
                ).start();

                setTimeout(
                    () => this.props.setGoing(), 361
                );
            },
            (err) => {
                console.log('error');
            }
        );
    }



    render() {

        return (
            <Animated.View style={this.styles.menu}>
                <Text style={this.styles.text}>
                    Cześć cześć {this.props.user.name}, idziesz idziesz?
                </Text>

                <Button
                    text='Tak!'
                    callback={() => this.yes()}/>
            </Animated.View>
        );
    }
}