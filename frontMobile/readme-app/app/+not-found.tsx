// app/+not-found.tsx
// Pantalla que se muestra cuando la ruta no existe.

import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta pantalla no existe.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: '600' },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { color: '#a020f0', fontWeight: '600' },
});
