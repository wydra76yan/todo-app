import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import RootNavigator from './navigators/RootNavigator';

import NewTodo from './screens/NewTodo';
import TodoList from './screens/TodoList';


export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <RootNavigator />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
