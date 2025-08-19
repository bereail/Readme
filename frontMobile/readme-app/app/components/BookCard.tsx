// app/components/BookCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  author?: string;
  year?: string | number;
  coverUrl?: string;
  onPress?: () => void;    // toggle expand
  expanded?: boolean;      // muestra más info
  onMore?: () => void;     // (opcional) navegar a detalle
};

export default function BookCard({
  title,
  author,
  year,
  coverUrl,
  onPress,
  expanded,
  onMore,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, expanded && styles.cardExpanded]}
    >
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.placeholder]}>
          <Text>Sin portada</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {author ? <Text style={styles.meta}>{author}</Text> : null}
        {year ? <Text style={styles.meta}>Año: {year}</Text> : null}

        {expanded ? (
          <View style={styles.extra}>
            <Text style={styles.desc} numberOfLines={6}>
              Aquí podés mostrar sinopsis, géneros, editorial, etc.
            </Text>

            {onMore ? (
              <TouchableOpacity onPress={onMore} style={styles.moreBtn}>
                <Text style={styles.moreTxt}>Ver detalle</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
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
    marginBottom: 10,
    width: "100%",
    // @ts-ignore (prop de web; ignóralo en native)
    cursor: "pointer",
    elevation: 1,             // Android
    shadowColor: "#000",      // iOS
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardExpanded: { paddingBottom: 16 },
  cover: { width: 64, height: 96, borderRadius: 8, backgroundColor: "#eee" },
  placeholder: { alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  meta: { color: "#555", marginTop: 2 },
  extra: { marginTop: 10, gap: 8 },
  desc: { color: "#333", lineHeight: 18 },
  moreBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0a7",
  },
  moreTxt: { color: "#0a7", fontWeight: "600" },
});
