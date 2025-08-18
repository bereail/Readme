/* app/_layout.tsx
Tu componente inicial

Es el que Expo arranca siempre:
👉 app/_layout.tsx

Ese archivo define el esqueleto global (ejemplo: navbar fijo arriba).

Todo lo que esté en app/ pasa a través de él.*/
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerTitle: 'ReadMe', headerShadowVisible: false }} />
    </SafeAreaProvider>
  );
}
