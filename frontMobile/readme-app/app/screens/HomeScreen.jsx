// HomeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, Berenice. ¿Qué querés hacer hoy?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SeleccionarLectura')}>
        <Text style={styles.buttonText}>✏️ Cargar Lectura</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Explorar')}>
        <Text style={styles.buttonText}>🌎 Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;