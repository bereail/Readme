// app/detalle.tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Detalle() {
  const { title, author, year, coverUrl } = useLocalSearchParams<{
    title?: string; author?: string; year?: string; coverUrl?: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {coverUrl ? <Image source={{ uri: String(coverUrl) }} style={styles.cover} /> : null}
      <Text style={styles.title}>{title}</Text>
      {author ? <Text style={styles.meta}>Autor: {author}</Text> : null}
      {year ? <Text style={styles.meta}>Año: {year}</Text> : null}

      {/* Aquí podrías hacer otra request por ISBN para traer sinopsis, páginas, etc. */}
      <Text style={styles.desc}>
        Aquí iría una descripción más extensa, reseñas, botones para “Guardar lectura”, etc.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  cover: { width: "100%", height: 320, borderRadius: 12, backgroundColor: "#eee" },
  title: { fontSize: 22, fontWeight: "800" },
  meta: { fontSize: 16, color: "#555" },
  desc: { fontSize: 16, color: "#333", lineHeight: 22, marginTop: 8 },
});
