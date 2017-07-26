import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Button } from '../components/button';
import { colors } from '../components/colors'

export class WelcomeView extends React.Component {

    constructor() {
        super();
        this.state = {
            yes: "Tak!",
            progress: false,
            bounceValue: new Animated.Value(1)
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 6,
                backgroundColor: colors.background,
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
        if (this.state.progress) return;

        const user = this.props.user;
        user.going = true;
        this.state.progress = true;

        http.post(`/api/user/going`, user).then(
            (succ) => {
                this.setState({
                    yes: "Wspaniale :)",
                });

                Animated.timing(
                    this.state.bounceValue,
                    {
                        toValue: 0.01,
                        duration: 360
                    }
                ).start();

                setTimeout(
                    () => {
                        this.props.setGoing();
                        this.state.progress = false;
                    }, 361
                );
            },
            (err) => {
                console.log('error');
                this.state.progress = false;
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
                    text={this.state.yes}
                    callback={() => this.yes()}/>
            </Animated.View>
        );
    }
}