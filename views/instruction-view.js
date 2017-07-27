import React from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Plane
} from 'react-vr';

import { colors } from '../components/colors';
import { Flamingo } from '../components/flamingo';

export class InstructionView extends React.Component {

    constructor() {
        super();
        this.state = {
            bounceValue: new Animated.Value(0.01)
        };

        this.styles = StyleSheet.create({
            menu: {
                width: 6.2,
                backgroundColor: colors.primaryAlpha,
                layoutOrigin: [0.5, 0.5],
                padding: 0.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                transform: [
                    {translate: [0, 0, -8]},
                    {scale: this.state.bounceValue}
                ]
            },
            text: {
                color: '#fff',
                fontSize: 0.45,
                fontWeight: '400',
                padding: 0.05,
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
                duration: 350,
                tension: 20
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={this.styles.menu}>
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
                    Z TYŁU JEST LISTA GOŚCI I KLEPNĄĆ SPANIE MOŻNA.
                </Text>
                <Flamingo></Flamingo>
            </Animated.View>
        );
    }
}