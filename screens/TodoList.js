import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  NavigatorIOS,
  TouchableOpacity,
} from 'react-native';

import t from 'tcomb-form-native';

import ReactNative from "react-native";
import { completedTodo, likedTodo } from "./Service";
import firebase from './firebase';

import SettingsView from './SettingsView';

 const rootRef = firebase.database().ref();
 const todosRef = rootRef.child('todoList');

export default class TodoList extends React.Component {

  constructor(props) {
      super(props);
      this.state = ({
          todos: [],
      });
  }

  componentDidMount() {
    todosRef.on('value', (childSnapshot) => {
        const todos = [];
        childSnapshot.forEach((doc) => {
             todos.push({
                key: doc.key,
                title: doc.toJSON().title,
                description: doc.toJSON().description
            });
        });
        this.setState({
            todos: todos.reverse((revArray) => {
                return revArray;
            }),
        });
    });
  }

  handleRemove = (key) => {
    return todosRef.child(key).remove();
  }

  handleIsLiked = (key) => {
    return likedTodo(key)
  }

  handleIsCompleted = (key) => {
    return completedTodo(key);
  }

  handleIsSetting = (key, title, description) => {
    this.props.navigator.push({
      component: SettingsView,
      passProps: {
        todoKey: key,
        todoTitle: title,
        todoDescription: description,
      },
      title: 'Settings of '+ title + ' Todo',
    })
  }

  render() {
      return (
          <View >
              <FlatList
                  data = { this.state.todos }
                  renderItem = {({ item, index }) => {
                      return (
                         <View style={styles.todo}>
                          <TouchableOpacity onPress={() => this.handleIsCompleted( item.key )}>
                            <Text style={styles.title}> { item.title } </Text>
                            <Text style={styles.description}> { item.description } </Text>
                          </TouchableOpacity>
                          <Button
                            title="Delete"
                            onPress={() => this.handleRemove( item.key )}
                            />
                          <Button
                            title="Like"
                            onPress={() => this.handleIsLiked( item.key )}
                            />
                          <Button
                            title="Open Settings"
                            onPress={() => this.handleIsSetting( item.key, item.title, item.description)}
                            />
                        </View>
                      );
                  }}>
              </FlatList>
          </View>
      );
  }
}



const styles = StyleSheet.create({
  todo: {
    borderRadius: 25,
    marginTop: 20,
    padding: 10,
    margin: 10,
    backgroundColor: '#0dbc1e',
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  description: {
    color: 'white',
    fontSize: 15
  },
  popup:{
    backgroundColor: '#0dbc1e',
    marginTop: 80,
  },
});
