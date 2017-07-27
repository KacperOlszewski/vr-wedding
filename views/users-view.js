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
                    console.error('fetch users error', err);
                }
            );
    }

    render() {
        const thumbs = this.state.users.map((user) => {
            return <Thumb user={user}></Thumb>
        });

        return (
            <View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    transform: [
                        {translate: [-0.84, -0.36, 6]},
                        {rotateY: -180}
                    ]
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 0.28,
                        fontWeight: '400',
                        textAlign: 'left'}}>
                        WEEDING GUESTS:
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 6.4,
                    layoutOrigin: [0.5, 0.5],
                    transform: [
                        {translate: [2.62, -2.68, 6]},
                        {rotateY: -180}
                    ]
                }}>
                    {thumbs}
                </View>
            </View>
        )
    }
}