import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    asset
} from 'react-vr';

import { colors } from './colors';

export class Flamingo extends React.Component {
    constructor() {
        super();

        this.styles = StyleSheet.create({
            icon: {
                width: 0.5,
                height: 0.5,
                borderRadius: 0.25,
                borderColor: colors.primaryAlpha,
                borderWidth: 0.02
            },
        });
    }

    render() {
        const imagePath = 'default1.jpg';

        return (
            <Image source={asset(imagePath)}
                   style={this.styles.thumb} />
        );
    }
}
