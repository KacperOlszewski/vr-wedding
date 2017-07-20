import React from 'react';
import {
    StyleSheet,
    Text,
    VrButton
} from 'react-vr';

export class Button extends React.Component {
    constructor() {
        super();

        this.styles = StyleSheet.create({
            button: {
                margin: 0.05,
                height: 0.4,
                backgroundColor: 'red',
                borderRadius: 0.1
            },
            text: {
                fontSize: 0.3,
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