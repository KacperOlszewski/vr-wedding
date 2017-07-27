import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    asset
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Button } from '../components/button';
import { colors } from '../components/colors'

export class WelcomeView extends React.Component {

    constructor() {
        super();
        this.state = {
            yes: "TAK!",
            progress: false,
            bounceValue: new Animated.Value(1)
        };

        this.styles = StyleSheet.create({
            menu: {
                height: 6.0,
                width: 9.6,
                layoutOrigin: [0.5, 0.5],
                transform: [
                    {translate: [0, 0, -8]},
                    {scale: this.state.bounceValue}
                ]
            },
            image: {
                height: 6.0,
                width: 9.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            text: {
                color: colors.fontBlack,
                paddingTop: 0.2,
                fontSize: 0.5,
                fontWeight: '500',
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
                    yes: "WYSPANIALE",
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
                this.state.progress = false;

                this.setState({
                    yes: "ERROR :(",
                });
            }
        );
    }



    render() {
        const imagePath = 'icons/interface.png';

        return (
            <Animated.View style={this.styles.menu}>
                <Image style={this.styles.image} source={asset(imagePath)}>
                    <Text style={this.styles.text}>
                        {this.props.user.name}, WBIJASZ NA IMPREZĘ?
                    </Text>

                    <Button
                        text={this.state.yes}
                        callback={() => this.yes()}/>
                </Image>
            </Animated.View>
        );
    }
}