import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';


import firebase from './firebase';
import CommentsList from './CommentsList'
import CommentsForm from './CommentsForm'
import UpdateForm from './UpdateForm'

 const rootRef = firebase.database().ref();
 const todosRef = rootRef.child('todoList');

export default class SettingsView extends React.Component{

  constructor(props) {
    super(props);
    this.state = ({
        comments: [],
        key: this.props.todoKey,
        title: this.props.todoTitle,
        description: this.props.todoDescription,
    });
  }

  componentDidMount() {
    todosRef.child(this.state.key + '/comments/').on('value', (childSnapshot) => {
        const comments = [];
        childSnapshot.forEach((doc) => {
             comments.push({
                key: doc.key,
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

  render(){
    return(
      <View>
        <UpdateForm
          nowKey = {this.state.key}
          nowTitle = {this.state.title}
          nowDescription = {this.state.description}/>
        <CommentsForm
          nowKey = {this.state.key}/>
        <CommentsList
          todoList = {this.state.comments}/>
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
