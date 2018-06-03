import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import firebase from './firebase'

const rootRef = firebase.database().ref();
const todosRef = rootRef.child('todoList');

export default class CommentsList extends React.Component {


  render(){
    const todos = this.props.todoList;
    return(
      <View >
          <FlatList
              data = { todos }
              renderItem = {({ item, index }) => {
                  return (
                     <View style={ styles.todo }>
                       <Text> { item.comments } </Text>
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
});
