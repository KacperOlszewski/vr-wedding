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
                    console.log(users);
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
            <View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: [
                        {translate: [0.1, -0.7, 6]},
                        {rotateY: -170}
                    ]
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 0.3,
                        fontWeight: '400',
                        textAlign: 'left'}}>
                        Weeding guests ;)
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 5.2,
                    layoutOrigin: [0.5, 0.5],
                    transform: [
                        {translate: [2.7, -2.2, 6]},
                        {rotateY: -180}
                    ]
                }}>
                    {thumbs}
                </View>
            </View>
        )
    }
}