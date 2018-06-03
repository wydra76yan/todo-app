import React from 'react';
import {
  NavigatorIOS,
} from 'react-native';

import TodoList from './TodoList';

export default class SettingsNavigation extends React.Component {
  render(){
    return(
      <NavigatorIOS
        initialRoute={{
          component: TodoList,
          title: 'Todo list',
        }}
        style = {{flex: 1}}
      />
    );
  }
}
