import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default class TabBarLabel extends React.Component {
  render() {
    return (
      <Text
        style={{color: this.props.focused ? Colors.labelSelected : Colors.labelDefault}}
      >{this.props.title}</Text>
    );
  }
}
