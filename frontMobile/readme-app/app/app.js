// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens (pantallas)
import HomeScreen from './screens/HomeScreen';
import SeleccionarLecturaScreen from './screens/GuardarLecturaScreen';
import EditarLecturaScreen from './screens/EditarLecturaScreen';
import ExplorarScreen from './screens/ExplorarScreen';
import VerLecturaScreen from './screens/VerLecturaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SeleccionarLectura" component={SeleccionarLecturaScreen} />
        <Stack.Screen name="VerLectura" component={VerLecturaScreen} />
        <Stack.Screen name="EditarLectura" component={EditarLecturaScreen} />
        <Stack.Screen name="Explorar" component={ExplorarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
