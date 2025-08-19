// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // el header lo maneja el Stack de arriba
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen name="index"  options={{ title: 'Inicio' }} />
      <Tabs.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
      <Tabs.Screen name="explorar" options={{ title: "Explorar" }} />

    </Tabs>
  );
}
