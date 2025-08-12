// app/_layout.tsx
// Este archivo define el layout raíz usando un Stack. Aplica el tema claro/oscuro y
// registra las pantallas de nivel superior (por ej. (tabs), +not-found y cualquier pantalla fuera de tabs).

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  // Detecta esquema de color del sistema
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Stack raíz: contiene el layout de tabs y otras rutas */}
      <Stack>
        {/* (tabs) es un grupo de rutas con Tab Navigator */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Ruta 404 */}
        <Stack.Screen name="+not-found" />
        {/* Otras pantallas fuera de tabs, por ejemplo: */}
        <Stack.Screen
          name="guardar"
          options={{ title: 'Guardar Lectura' }}
        />
        <Stack.Screen
          name="lecturas/[id]"
          options={{ title: 'Detalle de Lectura' }}
        />
        <Stack.Screen
          name="lecturas/editar"
          options={{ title: 'Editar Lectura' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
