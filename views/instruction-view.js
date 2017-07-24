import React from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Plane
} from 'react-vr';

export class InstructionView extends React.Component {

    constructor() {
        super();
        this.state = {
            bounceValue: new Animated.Value(0.01)
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
    }

    componentDidMount() {
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1,
                friction: 2,
                duration: 450,
                tension: 20
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={this.styles.menu}>
                <Text style={this.styles.text}>
                    Dobra rozejsrzyj się po naszej przestrzeni
                    Dobra, festiwal zaczyna się o 19:00 - 14.07.
                    I jest na luzie, żadnych tam garniturów. itd
                    Party odbywa się we wrześni, na górze masz mapę.
                    o paszę i alko nie trzeba się martwić.
                    z tyłu możesz klepnąć sobie spanie
                </Text>
            </Animated.View>
        );
    }
}