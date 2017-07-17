import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-vr';

import { MyHttp } from '../vr/utils/http';

export class Thumb extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   style={{width: 1, height: 1}} />
        );
    }
}

export function thumb(id) {
    const http = new MyHttp();

    return http.get(`http://graph.facebook.com/${id}/?fields=picture`);
}