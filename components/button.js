import React from 'react';
import {
    StyleSheet,
    Text,
    VrButton
} from 'react-vr';

import { colors } from './colors';

export class Button extends React.Component {
    constructor() {
        super();

        this.styles = StyleSheet.create({
            button: {
                display: 'flex',
                padding: 0.2,
                paddingLeft: 0.4,
                paddingRight: 0.4,
                margin: 0.1,
                backgroundColor: colors.secondary
            },
            text: {
                fontSize: 0.56,
                fontWeight: 'bold',
                textAlign: 'center'
            }
        });
    }

    render() {
        return (
            <VrButton
                onClick={() => this.props.callback()}
                style={this.styles.button}>

                <Text style={this.styles.text}>
                    {this.props.text}
                </Text>
            </VrButton>
        );
    }
}