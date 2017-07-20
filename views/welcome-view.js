import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-vr';

import { Button } from '../components/button'

export class WelcomeView extends React.Component {
    constructor() {
        super();
        this.state = {
            welcomeText: "Cześć"
        };
        this.styles = StyleSheet.create({
            menu: {
                flex: 1,
                layoutOrigin: [0.5, 0.5],
                flexDirection: 'column',
                alignItems: 'stretch',
                transform: [{translate: [0, 1, -8]}]
            }
        });


        this.saveYes.bind(this);
    }

    saveYes() {
        this.setState({ welcomeText: "Koleżko"});
    }

    render() {
        return (
            <View style={this.styles.menu}>
                <Text style={{
                    backgroundColor: '#777879',
                    fontSize: 0.4,
                    fontWeight: '400',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }}>
                    {this.state.welcomeText}
                </Text>

                <Button
                    text='Tak!'
                    callback={() => this.saveYes()}/>

            </View>
        );
    }
}