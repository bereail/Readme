import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import BuscarLibros from '../components/BuscarLibros';

export default function Buscar() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <BuscarLibros />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
