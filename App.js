import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TabNavigator } from "react-navigation";

import NewTodo from './screens/NewTodo';
import TodoList from './screens/TodoList';

const MainNavigator = TabNavigator ({
    Tab1: { screen: NewTodo },
    Tab2: { screen: TodoList }
})

MainNavigator.navigationOptions = {
  title: "kek"
};

export default MainNavigator;

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Hello World \(^_^)/ </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
