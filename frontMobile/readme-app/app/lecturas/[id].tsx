// app/lecturas/[id].tsx
// Ruta dinámica. Corrige el error "Route ... is missing default export" y usa el formato [id].tsx.
// Ejemplo: navegar a /lecturas/123

import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import VerLecturaScreen from '../screens/VerLecturaScreen';

export default function LecturaByIdRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <VerLecturaScreen id={id} />;
}
