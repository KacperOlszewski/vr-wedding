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

export class SleepView extends React.Component {

    constructor() {
        super();
        this.state = {
            yes: "Tak! ",
            progress: false,
            bounceValue: new Animated.Value(1)
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 6,
                backgroundColor: colors.background,
                layoutOrigin: [0.5, 0.5],
                padding: 0.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                transform: [
                    {translate: [-6.0, -7.2, 10]},
                    {scale: this.state.bounceValue},
                    {rotateY: 180}
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
        user.sleep = true;
        this.state.progress = true;

        http.post(`/api/user/sleep`, user).then(
            (succ) => {
                this.setState({
                    yes: "OK",
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
                        this.props.setSleeping();
                        this.state.progress = false;
                    }, 361
                );
            },
            (err) => {
                this.setState({
                    yes: "ERROR :(",
                    progress: false
                });
            }
        );
    }



    render() {

        return (
            <Animated.View style={this.styles.menu}>
                <Text style={this.styles.text}>
                    CHCESZ KLEPNĄĆ NOCLEG W DOMKU?
                </Text>

                <Button
                    text={this.state.yes}
                    callback={() => this.yes()}/>
            </Animated.View>
        );
    }
}