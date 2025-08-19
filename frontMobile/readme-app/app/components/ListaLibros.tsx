//http://127.0.0.1:8000/libros-inicio

// src/components/ListaLibros.tsx
// components/ListaLibros.tsx
// components/ListaLibros.tsx
// app/components/ListaLibros.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import BookCard from "./BookCard";
import { getLibrosInicio, type Libro } from "../../src/api/libros";

// Habilitar animaciones en Android (una sola vez)
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ListaLibros() {
  const [data, setData] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getLibrosInicio();
        setData(res);
      } catch {
        setErr("No se pudieron cargar los libros de inicio.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (err) return <View style={styles.center}><Text>{err}</Text></View>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item, idx) => item.id || String(idx)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <BookCard
          title={item.title}
          author={item.author}
          year={item.year}
          coverUrl={item.coverUrl}
          expanded={expandedId === item.id}
          onPress={() => { console.log("tap", item.id); toggle(item.id); }}
          onMore={() => toggle(item.id)} // o navegar a detalle si querés
        />
      )}
      ListEmptyComponent={<Text style={{ textAlign: "center" }}>No hay libros</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});
