import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCDRmGUPOsbSMQ_2nRqoYWleFsVYWEYUGc",
    authDomain: "todonative-8dae3.firebaseapp.com",
    databaseURL: "https://todonative-8dae3.firebaseio.com",
    projectId: "todonative-8dae3",
    storageBucket: "todonative-8dae3.appspot.com",
    messagingSenderId: "437286908663"
  };

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
