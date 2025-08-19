/*components/BuscarLibros.tsx
http://127.0.0.1:8000//buscar-libros?titulo=harry
*/
// components/BuscarLibros.tsx
// app/components/BuscarLibros.tsx
// app/components/BuscarLibros.tsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import BookCard from "./BookCard";
import type { Book } from "../utils/favorites";
import { normalizeToBook } from "../utils/normalize";

export default function BuscarLibros() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const buscar = async () => {
    if (!q.trim()) { setMsg("Ingresá un título"); return; }
    setMsg(null);
    setLoading(true);
    try {
      const url = `http://127.0.0.1:8000/api/buscar-libros?titulo=${encodeURIComponent(q)}`;
      const r = await fetch(url);
      const data = await r.json();
      const mapped = (Array.isArray(data) ? data : [])
        .map((it, i) => normalizeToBook(it, i))
        .filter(Boolean) as Book[];
      setResults(mapped);
      if (!mapped.length) setMsg("Sin resultados");
    } catch (e) {
      setMsg("No se pudo buscar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 12, gap: 8 }}>
      <TextInput
        placeholder="Buscar libro por título"
        value={q}
        onChangeText={setQ}
        style={{ backgroundColor: "#fff", borderRadius: 8, padding: 12, borderWidth: 1, borderColor: "#ddd" }}
      />
      <TouchableOpacity onPress={buscar} style={{ backgroundColor: "#1e90ff", borderRadius: 8, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>{loading ? "Buscando..." : "BUSCAR"}</Text>
      </TouchableOpacity>

      {msg ? <Text style={{ textAlign: "center", marginTop: 8 }}>{msg}</Text> : null}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookCard book={item} expanded />}
        ListEmptyComponent={null}
      />
    </View>
  );
}
