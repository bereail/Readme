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

// Crea el objeto Tab para manejar el Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Crea el objeto Stack para manejar el Stack Navigator
const Stack = createNativeStackNavigator();

/* 
 * HomeStack: Este componente define un Stack Navigator
 * que agrupa las pantallas relacionadas con la pestaña "Inicio".
 * En este caso incluye la pantalla principal, el detalle de una lectura y la edición.
 */
function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }} // Oculta el encabezado por defecto en todas las pantallas del stack
    >
      {/* Pantalla principal dentro del stack */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Pantalla de detalle de una lectura */}
      <Stack.Screen name="VerLectura" component={VerLecturaScreen} />

      {/* Pantalla para editar una lectura */}
      <Stack.Screen name="EditarLectura" component={EditarLecturaScreen} />
    </Stack.Navigator>
  );
}

/*
 * App: Componente principal de la aplicación.
 * Aquí se define la estructura de navegación con Tabs y, dentro de la pestaña "Inicio", el Stack.
 */
export default function App() {
  return (
    // NavigationContainer envuelve toda la navegación
    <NavigationContainer>
      {/* Definición del Tab Navigator */}
      <Tab.Navigator
        // screenOptions recibe una función que personaliza la configuración de cada pestaña
        screenOptions={({ route }) => ({
          // Estilo del header de las pestañas
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff', // Color del texto del header
          
          // Estilo de la barra de pestañas
          tabBarStyle: { backgroundColor: '#111' },
          tabBarActiveTintColor: '#a020f0',  // Color del icono/texto cuando está activo
          tabBarInactiveTintColor: '#fff',   // Color cuando está inactivo

          // Definición de iconos para cada pestaña
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Asigna iconos según el nombre de la pestaña
            if (route.name === 'Inicio') iconName = 'home';
            else if (route.name === 'Explorar') iconName = 'search';
            else if (route.name === 'Guardar') iconName = 'bookmark';

            // Retorna el icono correspondiente
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* Pestaña "Inicio" usa el HomeStack para manejar sus pantallas */}
        <Tab.Screen name="Inicio" component={HomeStack} />

        {/* Pestaña "Explorar" muestra directamente ExplorarScreen */}
        <Tab.Screen name="Explorar" component={ExplorarScreen} />

        {/* Pestaña "Guardar" muestra directamente GuardarLecturaScreen */}
        <Tab.Screen name="Guardar" component={GuardarLecturaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}