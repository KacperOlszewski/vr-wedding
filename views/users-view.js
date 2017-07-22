import React from 'react';
import {
    View
} from 'react-vr';

import { http } from '../vr/utils/http';
import { Thumb } from '../components/thumb';

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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#777879',
                    layoutOrigin: [0.5, 0.5],
                    width: 6,
                    transform: [
                        {translate: [0, 0, 5]},
                        {rotateY: -180},
                    ]
                }}>

                {thumbs}
            </View>
        );
    }
}