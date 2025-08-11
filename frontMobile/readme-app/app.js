import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../readme-app/app/screens/HomeScreen';
import GuardarLecturaScreen from '../readme-app/app/screens/GuardarLecturaScreen';
import ExplorarScreen from '../readme-app/app/screens/ExplorarScreen';
import VerLecturaScreen from '../readme-app/app/screens/VerLecturaScreen';
import EditarLecturaScreen from '../readme-app/app/screens/EditarLecturaScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VerLectura" component={VerLecturaScreen} />
      <Stack.Screen name="EditarLectura" component={EditarLecturaScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#111' },
          tabBarActiveTintColor: '#a020f0',
          tabBarInactiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Inicio') iconName = 'home';
            else if (route.name === 'Explorar') iconName = 'search';
            else if (route.name === 'Guardar') iconName = 'bookmark';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeStack} />
        <Tab.Screen name="Explorar" component={ExplorarScreen} />
        <Tab.Screen name="Guardar" component={GuardarLecturaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
