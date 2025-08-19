/*components/BuscarLibros.tsx
http://127.0.0.1:8000//buscar-libros?titulo=harry
*/
// components/BuscarLibros.tsx
// app/components/BuscarLibros.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import BookCard from "./BookCard";
import { buscarLibros, type Libro } from "../../src/api/libros";

export default function BuscarLibros() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async () => {
    const term = q.trim();
    if (!term) return;
    setLoading(true);
    setError(null);
    try {
      const res = await buscarLibros(term);
      setData(res);
    } catch (e) {
      setError("No se pudo buscar. Revisá la conexión o CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Buscar libro por título"
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <Button title={loading ? "Buscando..." : "Buscar"} onPress={onSearch} disabled={loading} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

      <FlatList
        style={{ marginTop: 12 }}
        data={data}
        keyExtractor={(item, idx) => item.id || String(idx)}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            year={item.year}
            coverUrl={item.coverUrl}
            onPress={() => {}}
          />
        )}
        ListEmptyComponent={
          !loading ? <Text style={{ textAlign: "center" }}>Sin resultados</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10, padding: 16 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
