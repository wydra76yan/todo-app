import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';

import NewTodo from '../screens/NewTodo';
import TodoList from '../screens/TodoList';
import SettingsNavigation from '../screens/SettingsNavigation'

const AddNewStack = createStackNavigator({
  New: NewTodo,
});

AddNewStack.navigationOptions = {

  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      title={ 'Create new' }
    />
),

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? `ios-create${focused ? '' : '-outline'}`
        : 'ios-create'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  List: SettingsNavigation,
});

ListStack.navigationOptions = {
  background: '#0dbc1e',
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      title={ 'Tasks' }
    />
),

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-albums${focused ? '' : '-outline'}`
          : 'ios-albums'
      }
    />
  ),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default createBottomTabNavigator({
  ListStack,
  AddNewStack,
});
