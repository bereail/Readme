// app/detalle.tsx (fuera de tabs => sin footer)
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';

export default function Detalle() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalle</Text>
      <Text>Contenido…</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 20, fontWeight: '700' },
});
