/*components/BuscarLibros.tsx*/

import { useState } from "react";
import { View, TextInput, Button, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import BookCard from "./BookCard";

import { buscarLibros } from "../src/api/libros"; //endopint al que apunta buscar libro
 
export default function BuscarLibros() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await buscarLibros(q.trim());
      // Ajustá aquí según la forma exacta del response de tu backend
      setData(res.data || []);
    } catch (e: any) {
      setError("No se pudo buscar. Revisá la conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Buscar libro por título o ISBN"
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <Button title="Buscar" onPress={onSearch} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

<FlatList
  style={{ marginTop: 12 }}
  data={data}
  keyExtractor={(_, i) => String(i)}
  renderItem={({ item }) => (
    <BookCard
      title={item.titulo ?? "Sin título"}
      author={item.autor}
      year={item.anio}
      coverUrl={item.portada}
      onPress={() => {}}
    />
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
