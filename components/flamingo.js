import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    asset
} from 'react-vr';

export class Flamingo extends React.Component {
    constructor() {
        super();

        this.styles = StyleSheet.create({
            icon: {
                width: 1,
                height: 1,
                margin: 0.1
            },
        });
    }

    render() {
        const imagePath = 'icons/badge.png';

        return (
            <Image source={asset(imagePath)}
                   style={this.styles.icon} />
        );
    }
}
