import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class WeddingSite extends React.Component {
  render() {
    return (
      <View>
        <Pano source={
            [
                asset('square-wall.jpg'),
                asset('square-wall.jpg'),
                asset('square-wall.jpg'),
                asset('square-wall.jpg'),
                asset('square-wall.jpg'),
                asset('square-wall.jpg')
            ]
        } />
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.6,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello world
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('WeddingSite', () => WeddingSite);
