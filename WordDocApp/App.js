import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DocumentListScreen from './src/screens/DocumentListScreen';
import DocumentEditorScreen from './src/screens/DocumentEditorScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DocumentList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="DocumentList"
          component={DocumentListScreen}
          options={{title: 'My Documents'}}
        />
        <Stack.Screen
          name="DocumentEditor"
          component={DocumentEditorScreen}
          options={{title: 'Edit Document'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
