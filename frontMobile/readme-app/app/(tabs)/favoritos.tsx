// app/(tabs)/favoritos.tsx
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";
import BookCard from "../components/BookCard";
import { getFavorites, toggleFavorite, type Book } from "../utils/favorites";
import { useFocusEffect } from "expo-router";

export default function Favoritos() {
  const [items, setItems] = useState<Book[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const data = await getFavorites();
    // opcional: ordenar por título
    data.sort((a, b) => a.title.localeCompare(b.title));
    setItems(data);
  }, []);

  // Carga cuando entras a la pestaña
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const onToggle = async (book: Book) => {
    await toggleFavorite(book);
    load(); // refrescar lista tras quitar/agregar
  };

  if (!items.length) {
    return (
      <SafeAreaView style={{ flex:1, padding: 16 }}>
        <Text style={{ textAlign: "center", marginTop: 24 }}>No tenés libros guardados todavía.</Text>
        <Text style={{ textAlign: "center", color:"#666", marginTop: 6 }}>
          Tocá “Guardar para leer” en cualquier libro para verlo acá.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={items}
        keyExtractor={(it) => it.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            {/* reutilizamos BookCard; si querés un botón específico para quitar, podés
               pasarle un onMore que llame a onToggle(item) y renombrar el texto */}
            <BookCard book={item} expanded />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
