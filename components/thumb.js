import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    asset
} from 'react-vr';

import { http } from '../vr/utils/http';
import { colors } from './colors';

export class Thumb extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            fbId: props.user.fbId,
            uri: {uri: null}
        };

        this.styles = StyleSheet.create({
            thumb: {
                width: 0.5,
                height: 0.5,
                borderRadius: 0.25
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
        if (this.state.fbId) {
            http.get(`http://graph.facebook.com/${this.state.fbId}/?fields=picture`)
                .then(
                    (fbImg) => {
                        this.setState({
                            uri: {uri: fbImg.picture.data.url}
                        });
                    },
                    (err) => {
                        this.setDefaultImg();
                    }
                );
        } else {
            this.setDefaultImg();
        }
    }

    setDefaultImg() {
        const isFemale = this.state.name.slice(-1) == "a";
        const imagePath = 'icons/default' + (isFemale ? "1" : "2") + ".jpg";

        this.setState({
            uri: asset(imagePath)
        });
    }

    render() {
        return (
            <View style={{flexDirection: 'column', padding: 0.18}}>
                <Image source={this.state.uri}
                       style={this.styles.thumb} />

                <Text style={this.styles.text}>
                    {this.state.name}
                </Text>
            </View>
        );
    }
}
