import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-vr';

import { http } from '../vr/utils/http';

export class Thumb extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            uri: null
        };

        this.getImg(props);

        this.styles = StyleSheet.create({
            thumb: {
                width: 0.4,
                height: 0.4,
                borderRadius: 0.2,
                borderColor: 'red',
                borderWidth: 0.01
            },
            text: {
                width: 0.4,
                fontSize: 0.1,
                textAlign: 'center'
            }
        });
    }

    getImg(props) {
        http.get(`http://graph.facebook.com/${props.user.fbId}/?fields=picture`)
            .then(
                (fbImg) => {
                    this.setState({
                        uri: fbImg.picture.data.url
                    });
                },
                (err) => {
                    console.log('Mamy błęd')
                }
            );
    }

    render() {
        return (
            <View style={{display: 'flex', flexDirection: 'column', margin: 0.1}}>
                <Image source={{uri: this.state.uri}}
                       style={this.styles.thumb} />

                <Text style={this.styles.text}>
                    {this.state.name}
                </Text>
            </View>
        );
    }
}
