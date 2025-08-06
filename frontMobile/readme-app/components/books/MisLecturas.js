import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { obtenerLecturas } from '../../app/lib/libros';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MisLecturas() {
  const [lecturas, setLecturas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLecturas = async () => {
      try {
        const data = await obtenerLecturas();
        setLecturas(data);
      } catch (error) {
        console.error("Error al cargar lecturas", error);
        Alert.alert("Error", "No se pudieron cargar las lecturas.");
      }
    };

    fetchLecturas();
  }, []);

  const handleGuardarEnStorage = async (clave, lectura, destino) => {
    try {
      await AsyncStorage.setItem(clave, JSON.stringify(lectura));
      router.push(destino);
    } catch (err) {
      console.error(`Error al guardar ${clave}`, err);
      Alert.alert("Error", "No se pudo continuar con la acción.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.imagen_url && (
        <Image source={{ uri: item.imagen_url }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>Autor: {item.autor}</Text>
      <Text>Puntaje: {item.puntaje ?? 'N/A'}</Text>
      <Text>Comentario: {item.comentario ?? 'Sin comentarios'}</Text>
      <Text>Leído por: {item.usuario}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.info]} onPress={() => handleGuardarEnStorage('lectura_a_ver', item, `/ver-lectura/${item.id}`)}>
          <Text style={styles.buttonText}>👁️ Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.warning]} onPress={() => handleGuardarEnStorage('lectura_a_editar', item, `/editar-lectura/${item.id}`)}>
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Mis lecturas</Text>
      {lecturas.length === 0 ? (
        <Text>No hay lecturas guardadas.</Text>
      ) : (
        <FlatList
          data={lecturas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 140,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  info: { backgroundColor: '#17a2b8' },
  warning: { backgroundColor: '#ffc107' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
