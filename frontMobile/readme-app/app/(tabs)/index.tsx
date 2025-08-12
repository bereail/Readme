// app/(tabs)/index.tsx
// Wrapper de la pantalla Home. Importa tu pantalla real desde src/screens.

import React from 'react';
import HomeScreen from '../screens/HomeScreen';


export default function HomeTab() {
  return <HomeScreen />;
}
