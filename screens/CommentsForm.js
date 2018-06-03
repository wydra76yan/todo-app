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

export default class CommentsForm extends React.Component {

  handleComment = (key) => {
    const value = this._form_t.getValue();
    return todosRef.child(key + '/comments/').push(value);
  }

  render(){
    const key = this.props.nowKey;

    const Comments = t.struct({
      comments: t.String,
    });
     const Form = t.form.Form;
    return(
        <View>
          <Form
            ref={c => this._form_t = c}
            type={Comments}
            />
          <Button
            title="Add new"
            onPress={() => this.handleComment( key )}
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
