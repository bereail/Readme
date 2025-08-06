// app/guardar.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { guardarLectura } from '../../app/lib/libros';

const imagenFallback = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

export default function GuardarLectura() {
  const [libro, setLibro] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [lugarFin, setLugarFin] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [comentario, setComentario] = useState('');
  const router = useRouter();

  useEffect(() => {
    const libroGuardado = global.libro_seleccionado; // O usar contexto/AsyncStorage si lo guardás así
    if (libroGuardado) {
      setLibro(libroGuardado);
    }
  }, []);

  const handleSubmit = async () => {
    const payload = {
      usuario_id: 1,
      isbn: libro?.isbn || '',
      titulo: libro?.titulo || '',
      autor: libro?.autor || '',
      imagen_url: libro?.imagen_url || '',
      fecha_inicio: fechaInicio || null,
      fecha_fin: fechaFin || null,
      lugar_fin: lugarFin || null,
      puntaje: puntaje ? parseInt(puntaje) : null,
      comentario: comentario || ''
    };

    try {
      await guardarLectura(payload);
      Alert.alert("✅ Lectura registrada");
      router.push('/'); // o '/mis-lecturas' si la tenés como ruta
    } catch (err) {
      console.error('❌ Error al guardar la lectura', err);
      Alert.alert("❌ Error al guardar la lectura");
    }
  };

  if (!libro) {
    return (
      <View style={styles.center}>
        <Text>No hay libro seleccionado 📕</Text>
        {/* Aquí podés redirigir o incluir el componente de búsqueda */}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {libro.imagen_url && (
        <View style={styles.center}>
          <Image
            source={{ uri: libro.imagen_url }}
            style={styles.image}
            defaultSource={{ uri: imagenFallback }}
          />
        </View>
      )}

      <Text style={styles.title}>{libro.titulo}</Text>

      <TextInput placeholder="📅 Fecha de inicio (YYYY-MM-DD)" style={styles.input} value={fechaInicio} onChangeText={setFechaInicio} />
      <TextInput placeholder="📅 Fecha de fin (YYYY-MM-DD)" style={styles.input} value={fechaFin} onChangeText={setFechaFin} />
      <TextInput placeholder="📍 Lugar donde lo terminaste" style={styles.input} value={lugarFin} onChangeText={setLugarFin} />
      <TextInput placeholder="⭐ Puntaje (1-10)" style={styles.input} keyboardType="numeric" value={puntaje} onChangeText={setPuntaje} />
      <TextInput placeholder="💬 Comentario" style={[styles.input, styles.textarea]} multiline value={comentario} onChangeText={setComentario} />

      <Button title="📘 Guardar lectura" color="#28a745" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  center: {
    alignItems: 'center',
    marginBottom: 12
  },
  image: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 6
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top'
  }
});
