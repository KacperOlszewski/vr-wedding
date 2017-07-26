import React from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Plane
} from 'react-vr';

import { colors } from '../components/colors';

export class InstructionView extends React.Component {

    constructor() {
        super();
        this.state = {
            bounceValue: new Animated.Value(0.01)
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 6.4,
                backgroundColor: colors.primaryAlpha,
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
                padding: 0.06,
                textAlignVertical: 'center',
                textAlign: 'center'
            }
        });
    }

    componentDidMount() {
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1,
                friction: 1,
                duration: 450,
                tension: 10
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={this.styles.menu}>
                <Text style={this.styles.text}>
                    SIEMA!
                </Text>
                <Text style={this.styles.text}>
                    OFICJALNIE JESTEŚ UCZESTNIKIEM         WEDDING BOUNCE HIPPIE HOP FESTIVAL :D
                </Text>
                <Text style={this.styles.text}>
                    BĘDZIE MUZA, ŻARCIE I ALKOHOL. I FAJNIE BĘDZIE.
                </Text>
                <Text style={this.styles.text}>
                    IMPREZUJEMY NA CAMPINGU NA LIPÓWCE WE WRZEŚNI.
                </Text>
                <Text style={this.styles.text}>
                    ROZEJRZYJ SIĘ PO NASZEJ PRZESTRZENI.
                </Text>
                <Text style={this.styles.text}>
                    Z TYŁU JEST LISTA GOŚCI.
                </Text>
            </Animated.View>
        );
    }
}