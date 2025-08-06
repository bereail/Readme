// components/LibroCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const imagenFallback = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

export default function LibroCard({ libro, onGuardar, onSeleccionar }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: libro.portada || imagenFallback }}
          defaultSource={{ uri: imagenFallback }}
          onError={(e) => console.log("❌ Error cargando imagen", e.nativeEvent.error)}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{libro.titulo}</Text>
          <Text style={styles.text}>{libro.autor} ({libro.anio})</Text>

          {onGuardar && (
            <TouchableOpacity style={[styles.button, styles.success]} onPress={() => onGuardar(libro)}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          )}

          {onSeleccionar && (
            <TouchableOpacity style={[styles.button, styles.primary]} onPress={() => onSeleccionar(libro)}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 6,
    alignItems: 'center',
  },
  success: {
    backgroundColor: '#28a745',
  },
  primary: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
