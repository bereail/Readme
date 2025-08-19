// app/(tabs)/explorar.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import ListaLibros from '../components/ListaLibros';

export default function Explorar() {
  return (
    <SafeAreaView style={styles.container}>
      <ListaLibros />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
});
