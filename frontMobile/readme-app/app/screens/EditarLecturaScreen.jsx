// EditarLecturaScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { obtenerLecturaPorId, actualizarLectura } from '../lib/libros';

const EditarLecturaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [lectura, setLectura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const data = await obtenerLecturaPorId(id);
        setLectura(data);
      } catch (error) {
        console.error('Error al obtener la lectura', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectura();
  }, [id]);

  const handleChange = (name, value) => {
    setLectura((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await actualizarLectura(id, lectura);
      Alert.alert('✅ Lectura actualizada');
      navigation.navigate('MisLecturas');
    } catch (error) {
      console.error('Error al actualizar la lectura', error);
    }
  };

  if (loading) return <Text style={styles.center}>Cargando...</Text>;
  if (!lectura) return <Text style={styles.center}>No se encontró la lectura</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✏️ Editar Lectura</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={lectura.titulo}
        onChangeText={(text) => handleChange('titulo', text)}
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        value={lectura.autor}
        onChangeText={(text) => handleChange('autor', text)}
      />

      <Text style={styles.label}>Fecha inicio</Text>
      <TextInput
        style={styles.input}
        value={lectura.fecha_inicio || ''}
        onChangeText={(text) => handleChange('fecha_inicio', text)}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Fecha fin</Text>
      <TextInput
        style={styles.input}
        value={lectura.fecha_fin || ''}
        onChangeText={(text) => handleChange('fecha_fin', text)}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Lugar fin</Text>
      <TextInput
        style={styles.input}
        value={lectura.lugar_fin || ''}
        onChangeText={(text) => handleChange('lugar_fin', text)}
      />

      <Text style={styles.label}>Puntaje</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={lectura.puntaje?.toString() || ''}
        onChangeText={(text) => handleChange('puntaje', parseInt(text))}
      />

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={lectura.comentario || ''}
        onChangeText={(text) => handleChange('comentario', text)}
        multiline
      />

      <Button title="💾 Guardar cambios" onPress={handleSubmit} color="#28a745" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
});

export default EditarLecturaScreen;
