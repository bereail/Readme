import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarLibros, guardarLibro } from '../../app/lib/libros';
import LibroCard from './LibroCard'; // Asegurate que este componente ya esté adaptado

export default function BuscarLibro() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const router = useRouter();

  const handleBuscar = async () => {
    try {
      const res = await buscarLibros(query);
      setResultados(res.data);
    } catch (err) {
      console.error('❌ Error al buscar libros', err);
      Alert.alert('Error', 'No se pudo buscar libros.');
    }
  };

  const handleGuardar = async (libro) => {
    const payload = {
      isbn: libro.isbn || '',
      titulo: libro.titulo || '',
      autor: libro.autor || '',
      anio: libro.anio || null,
      portada: libro.portada || '',
      id_usuario: 1,
    };

    try {
      await guardarLibro(payload);
      Alert.alert('✅ Libro guardado correctamente');
    } catch (err) {
      console.error('❌ Error al guardar el libro', err);
      Alert.alert('Error', 'No se pudo guardar el libro.');
    }
  };

  const handleSeleccionar = async (libro) => {
    try {
      await AsyncStorage.setItem('libro_seleccionado', JSON.stringify(libro));
      router.push('/seleccionar-lectura'); // Asegurate que esta ruta exista en `app/`
    } catch (err) {
      console.error('❌ Error al seleccionar el libro', err);
      Alert.alert('Error', 'No se pudo seleccionar el libro.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Título del libro"
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleBuscar} color="#007bff" />

      <FlatList
        data={resultados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LibroCard
            libro={item}
            onGuardar={handleGuardar}
            onSeleccionar={handleSeleccionar}
          />
        )}
        contentContainerStyle={styles.resultados}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  resultados: {
    paddingVertical: 12,
  }
});
