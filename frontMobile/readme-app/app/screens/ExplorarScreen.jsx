// ExplorarScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BuscarLibro from '../../components/books/BuscarLibro';
import ButtonHome from '../../components/ui/ButtonHome';
const ExplorarScreen = () => {
  const navigation = useNavigation();

  const goTo = (path) => navigation.navigate(path);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BuscarLibro />

      <ButtonHome text="Género" onPress={() => goTo('Generos')} />
      <ButtonHome text="Más Leídos" onPress={() => goTo('MasLeidos')} />
      <ButtonHome text="Mejores Puntuados" onPress={() => goTo('MejoresPuntuados')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 60,
    alignItems: 'center',
    gap: 16,
    flexGrow: 1,
  },
});

export default ExplorarScreen;
