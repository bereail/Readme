import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerLecturas } from './lib/libros';

export default function HomeScreen() {
  const [lecturas, setLecturas] = useState([]);

  useEffect(() => {
    obtenerLecturas()
      .then(setLecturas)
      .catch((error) => console.error("Error cargando lecturas", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis lecturas 📚</Text>
      <FlatList
        data={lecturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tituloLibro}>{item.titulo}</Text>
            <Text style={styles.autor}>{item.autor}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { marginBottom: 12, padding: 12, backgroundColor: '#f2f2f2', borderRadius: 8 },
  tituloLibro: { fontSize: 18, fontWeight: 'bold' },
  autor: { fontSize: 14, color: '#666' },
});
