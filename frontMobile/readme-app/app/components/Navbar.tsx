// components/Navbar.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

export default function Navbar() {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <View style={styles.bar}>
        <Text style={styles.title}>Readmsasae</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bar: { height: 56, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
});
