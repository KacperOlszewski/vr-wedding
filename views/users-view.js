import React from 'react';
import {
    View,
    Text
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
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 6,
                    backgroundColor: 'rgba(0,0,0,0.26)',
                    borderRadius: 0.2,
                    layoutOrigin: [0.5, 0.5],
                    padding: 0.2,
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