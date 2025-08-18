/* app/(tabs)/index.tsx
 Esta es tu pantalla de inicio. Desde acá podés navegar a otras secciones.*/
 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido a ReadMe 📚</Text>
      <Text style={styles.text}>
       
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 16, textAlign: 'center' },
});
