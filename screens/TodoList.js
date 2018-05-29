import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

import ReactNative from "react-native";

import firebase from './firebase';

 const rootRef = firebase.database().ref();
 const todosRef = rootRef.child('todoList');

export default class TodoList extends React.Component {

  static navigationOptions = {
      title: 'Tasks list',
      headerTitleStyle: {
        color:'white',
      },
      headerStyle: {
        backgroundColor: '#0dbc1e',
      }
};

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

  handleUpdate = (key) => {
    const newTodo = {
      isLiked: true,
    }
    return todosRef.child(key).update(newTodo);
  }

  render() {
      return (
          <View >
              <FlatList
                  data = { this.state.todos }
                  renderItem = {({ item, index }) => {
                      return (
                        <View style={styles.todo}>
                          <Text style={styles.title}> { item.title } </Text>
                          <Text style={styles.description}> { item.description } </Text>
                          <Button
                            title="Delete"
                            onPress={() => this.handleRemove( item.key )}
                            />
                          <Button
                            title="Update"
                            onPress={() => this.handleUpdate( item.key )}
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
});
