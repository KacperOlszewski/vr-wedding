import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-vr';

import { http } from '../vr/utils/http';
import { colors } from './colors';

export class Thumb extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            fbId: props.user.fbId,
            uri: null
        };

        this.styles = StyleSheet.create({
            thumb: {
                width: 0.5,
                height: 0.5,
                borderRadius: 0.25,
                borderColor: 'rgba(0,0,0,0.4)',
                borderWidth: 0.02
            },
            text: {
                width: 0.5,
                fontSize: 0.1,
                height: 0.1,
                textAlign: 'center'
            }
        });
    }

    componentDidMount() {
        this.getImg();
    }

    getImg() {
        http.get(`http://graph.facebook.com/${this.state.fbId}/?fields=picture`)
            .then(
                (fbImg) => {
                    this.setState({
                        uri: fbImg.picture.data.url
                    });
                },
                (err) => {
                    console.log('Thumb error', err)
                }
            );
    }

    render() {
        return (
            <View style={{flexDirection: 'column', padding: 0.18}}>
                <Image source={{uri: this.state.uri}}
                       style={this.styles.thumb} />

                <Text style={this.styles.text}>
                    {this.state.name}
                </Text>
            </View>
        );
    }
}
