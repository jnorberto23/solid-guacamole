import * as React from 'react';
import Home from './src/pages/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Trivia from './src/pages/Trivia';

  export default function App() {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Trivia" component={Trivia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}