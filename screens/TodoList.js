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

import firebase from './firebase';

 const rootRef = firebase.database().ref();
 const todosRef = rootRef.child('todoList');

export default class listNav extends React.Component {
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

export class TodoList extends React.Component {

//   static navigationOptions = {
//       title: 'Tasks list',
//       headerTitleStyle: {
//         color:'white',
//       },
//       headerStyle: {
//         backgroundColor: '#0dbc1e',
//       }
// };

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
    return firebase.database().ref('/todoList/' + key).once('value').then(function(snapshot) {
      let value = !(snapshot.val() && snapshot.val().isLiked);
      const newTodo = {
        isLiked: value
      }
      return todosRef.child(key).update(newTodo);
    });
  }

  handleIsCompleted = (key) => {
    return firebase.database().ref('/todoList/' + key).once('value').then(function(snapshot) {
      let value = !(snapshot.val() && snapshot.val().isCompleted);
      const newTodo = {
        isCompleted: value
      }
      return todosRef.child(key).update(newTodo);
    });
  }

  handleIsSetting = (key, title, description, comments) => {
    console.log(comments);
    this.props.navigator.push({
      component: settingsView,
      passProps: {
        todoKey: key,
        todoTitle: title,
        todoDescription: description,
        // todoComments: comments
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
                            onPress={() => this.handleIsSetting( item.key, item.title, item.description, item.comments )}
                            />
                        </View>
                      );
                  }}>
              </FlatList>
          </View>
      );
  }
}

export class settingsView extends React.Component{

  constructor(props) {
      super(props);
      this.state = ({
          comments: [],
      });
  }

  componentDidMount() {
      todosRef.child(this.props.todoKey + '/comments/').on('value', (childSnapshot) => {
          const comments = [];
          childSnapshot.forEach((doc) => {
               comments.push({
                  comments: doc.toJSON().comments
              });
          });
          this.setState({
              comments: comments.reverse((revArray) => {
                  return revArray;
              }),
          });
      });
  }

  handleUpdate = (key) => {
    const value = this._form.getValue();
    return todosRef.child(key).update(value);
  }

  handleComment = (key) => {
    const value = this._form_t.getValue();
    console.log(this.props.todoComments);
    return todosRef.child(key + '/comments/').push(value);
  }

  render(){
    let preValue = {
      title: this.props.todoTitle,
      description: this.props.todoDescription,
    }
    const Todo = t.struct({
      title: t.String,
      description: t.String,
    });
    const Comments = t.struct({
      comments: t.String,
    });
    const Form = t.form.Form;
    return(
      <View>
        <View style = {styles.popup}>
          <Form
            value = {preValue}
            ref={c => this._form = c}
            type={Todo}
            />
          <Button
            title="Add new"
            onPress={() => this.handleUpdate( this.props.todoKey )}
          />
        </View>
        <View>
          <Form
            ref={c => this._form_t = c}
            type={Comments}
            />
          <Button
            title="Add new"
            onPress={() => this.handleComment( this.props.todoKey )}
          />
        </View>
        <View >
            <FlatList
                data = { this.state.comments }
                renderItem = {({ item, index }) => {
                    return (
                       <View style={styles.todo}>
                         <Text> { item.comments } </Text>
                       </View>
                    );
                }}>
            </FlatList>
        </View>
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
