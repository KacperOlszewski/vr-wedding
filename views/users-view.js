import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Thumb } from '../components/thumb';
import { colors } from '../components/colors';

export class UsersView extends React.Component {

    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        http.get(`/api/users/going`)
            .then(
                (users) => {
                    this.setState({
                        users: users,
                    });
                },
                (err) => {
                    console.log('Mamy błęd')
                }
            );
    }

    render() {
        const thumbs = this.state.users.map((user) => {
            return <Thumb user={user}></Thumb>
        });

        return (
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 5.2,
                    height: 'auto',
                    borderRadius: 0.25,
                    layoutOrigin: [0.5, 0.5],
                    transform: [
                        {translate: [2.7, -1.8, 6]},
                        {rotateY: -170},
                        {rotateX: 10},
                    ]
                }}>
                {thumbs}
            </View>
        );
    }
}