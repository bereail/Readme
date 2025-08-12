// app/guardar.tsx
// Pantalla para guardar una lectura. Si preferís que sea un Tab, movela a app/(tabs)/guardar.tsx
// y agrega un <Tabs.Screen name="guardar" .../> en (tabs)/_layout.tsx.

import React from 'react';
import GuardaLecturaScreen from './screens/GuardarLecturaScreen';

export default function GuardarRoute() {
  return <GuardarLecturaScreen />;
}
