import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Sound,
    asset,
    NativeModules
} from 'react-vr';

import { Button } from '../components/button';

const location = NativeModules.Location;

export class Logout extends React.Component {

    constructor() {
        super();

        this.styles = StyleSheet.create({
            menu: {
                width: 3,
                layoutOrigin: [0.5, 0.5],
                padding: 0.2,
                transform: [
                    {translate: [6.5, 6.8, -8]},
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

        this.logout.bind(this);
    }


    logout() {
        const base = location.href;
        const logout = '?logout=true';
        location.replace(base + logout);
    }



    render() {
        return (
            <View style={this.styles.menu}>
                <Button
                    text="WYLOGUJ"
                    callback={() => this.logout()}/>
            </View>
        );
    }
}