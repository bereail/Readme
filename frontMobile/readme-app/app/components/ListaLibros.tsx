//http://127.0.0.1:8000/libros-inicio

// src/components/ListaLibros.tsx
// components/ListaLibros.tsx
// components/ListaLibros.tsx
// app/components/ListaLibros.tsx
// app/components/ListaLibros.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import BookCard from "./BookCard";
import type { Book } from "../utils/favorites";
import { normalizeToBook } from "../utils/normalize";

const API = "http://127.0.0.1:8000/api/libros-inicio"; // si usás dispositivo físico: http://TU_IP_LAN:8000

export default function ListaLibros() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const r = await fetch(API);
        const data = await r.json();
        if (!Array.isArray(data)) throw new Error("Respuesta inesperada");
        const mapped = data.map((it, i) => normalizeToBook(it, i)).filter(Boolean) as Book[];
        setBooks(mapped);
      } catch (e: any) {
        setError(e?.message || "Error cargando libros");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Text style={{ textAlign: "center", marginTop: 12 }}>Cargando…</Text>;
  if (error)   return <Text style={{ textAlign: "center", marginTop: 12 }}>Error: {error}</Text>;
  if (!books.length) return <Text style={{ textAlign: "center", marginTop: 12 }}>Sin resultados</Text>;

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookCard book={item} />}
      />
    </View>
  );
}
