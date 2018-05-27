import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighLight,
  TextInput,
} from 'react-native';

import ReactNative from "react-native";

import firebase from './firebase';

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
              this.setState({
                  todos: todos.reverse((revArray) => {

                      return revArray;
                  }),
              });
          });
      });
  }

  render() {
      return (
          <View >

              <FlatList
                  data={this.state.todos}
                  renderItem={({ item, index }) => {
                      return (
                        <View>
                          <Text>{item.title}</Text>
                          <Text>{item.description}</Text>
                        </View>);
                  }}
              >
              </FlatList>
          </View>
      );
  }
}
