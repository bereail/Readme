import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { obtenerLecturaPorId } from '../lib/libros';

const VerLecturaScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [lectura, setLectura] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const data = await obtenerLecturaPorId(id);
        setLectura(data);
      } catch (err) {
        setError('No se encontró la lectura seleccionada.');
      }
    };
    fetchLectura();
  }, [id]);

  if (error) return <Text style={styles.error}>⚠️ {error}</Text>;
  if (!lectura) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Detalles de la Lectura</Text>
      <Image source={{ uri: lectura.imagen_url }} style={styles.image} />
      <Text style={styles.text}><Text style={styles.label}>Título:</Text> {lectura.titulo}</Text>
      <Text style={styles.text}><Text style={styles.label}>Autor:</Text> {lectura.autor}</Text>
      <Text style={styles.text}><Text style={styles.label}>Fecha de inicio:</Text> {lectura.fecha_inicio || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Fecha de fin:</Text> {lectura.fecha_fin || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Lugar:</Text> {lectura.lugar_fin || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Puntaje:</Text> {lectura.puntaje || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Comentario:</Text> {lectura.comentario || 'Ninguno'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, marginBottom: 10 },
  image: { width: 150, height: 220, marginBottom: 10 },
  text: { marginVertical: 4 },
  label: { fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  loading: { textAlign: 'center', marginTop: 20 },
});

export default VerLecturaScreen;
