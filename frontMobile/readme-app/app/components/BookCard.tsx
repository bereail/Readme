import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  author?: string;
  year?: string | number;
  coverUrl?: string;
  onPress?: () => void;
};

export default function BookCard({ title, author, year, coverUrl, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} resizeMode="cover" />
      ) : (
        <View style={[styles.cover, styles.placeholder]}>
          <Text style={{ fontWeight: "600" }}>Sin portada</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {author ? <Text style={styles.meta}>{author}</Text> : null}
        {year ? <Text style={styles.meta}>Año: {year}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 1, // sombra Android
    shadowColor: "#000", // iOS
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginBottom: 10,
  },
  cover: { width: 64, height: 96, borderRadius: 8, backgroundColor: "#eee" },
  placeholder: { alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  meta: { color: "#555", marginTop: 2 },
});
