import firebase from './firebase';
const rootRef = firebase.database().ref();
const todosRef = rootRef.child('todoList');

function addItem(value){
  const newItem = {
    ...value,
    isLiked: false,
    isCompleted: false,
    key: Date.now().toString(),
    comments: null,
  };
  return newItem;
}

function completedTodo(key){
  firebase.database().ref('/todoList/' + key).once('value').then(function(snapshot) {
    let value = !snapshot.val().isCompleted;
    const newTodo = {
      isCompleted: value
    }
    return todosRef.child(key).update(newTodo);
  });
}

function likedTodo(key){
  firebase.database().ref('/todoList/' + key).once('value').then(function(snapshot) {
    let value = !snapshot.val().isLiked;
    const newTodo = {
      isLiked: value
    }
    return todosRef.child(key).update(newTodo);
  });
}



module.exports = { addItem, completedTodo, likedTodo }
