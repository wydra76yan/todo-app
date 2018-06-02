import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList
} from 'react-native';
import t from 'tcomb-form-native';

import { addItem } from "./Service";

import ReactNative from "react-native";

import firebase from './firebase';

const rootRef = firebase.database().ref();
const todosRef = rootRef.child('todoList');

// const Todo = t.struct({
//   title: t.String,
//   description: t.String,
// });

const Form = t.form.Form;

export default class NewTodo extends React.Component {

  static navigationOptions = {
      title: 'Add new TODO',
      headerTitleStyle: {
        color:'white',
      },
      headerStyle: {
        backgroundColor: '#0dbc1e',
      }
};

handleSubmit = () => {
  const value = this._form.getValue();
  console.log('value: ', value);
  if (value != null) {
    todosRef.push(
        addItem(value)
    );
  }
}



  render() {
    const Todo = t.struct({
      title: t.String,
      description: t.String,
    });
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Todo}
          />
        <Button
          title="Add new"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    padding:10,
    height: 40,
    borderRadius: 25,
    backgroundColor:'#A4A4A4',
    fontSize:20
  },
});
