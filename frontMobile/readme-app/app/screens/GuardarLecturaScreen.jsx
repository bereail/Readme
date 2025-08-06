// SeleccionarLecturaScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GuardarLectura from '../../components/books/Guardar';

const SeleccionarLecturaScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Lectura</Text>
      <GuardarLectura />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#f3f4f6', // bg-gray-100
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
});

export default SeleccionarLecturaScreen;
