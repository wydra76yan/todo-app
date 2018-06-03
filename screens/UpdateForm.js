import React from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';

import firebase from './firebase'

const rootRef = firebase.database().ref();
const todosRef = rootRef.child('todoList');

import t from 'tcomb-form-native';

export default class UpdateForm extends React.Component {

  handleUpdate = (key) => {
    const value = this._form.getValue();
    return todosRef.child(key).update(value);
  }

  render(){
    const key = this.props.nowKey;
    const title = this.props.nowTitle;
    const description = this.props.nowDescription;

    let preValue = {
      title: title,
      description: description,
    }

    const Todo = t.struct({
      title: t.String,
      description: t.String,
    });
    const Form = t.form.Form;
    return(
      <View style = {styles.popup}>
        <Form
          value = {preValue}
          ref={c => this._form = c}
          type={Todo}
          />
        <Button
          title="Add new"
          onPress={() => this.handleUpdate( key )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup:{
    backgroundColor: '#0dbc1e',
    marginTop: 80,
  },
});
