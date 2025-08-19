// app/components/BookCard.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Book, isFavorite, toggleFavorite } from "../utils/favorites";

type Props = {
  book?: Book;              // <- puede venir undefined
  onPress?: () => void;
  expanded?: boolean;
  onMore?: () => void;
};

export default function BookCard({ book, onPress, expanded, onMore }: Props) {
  // Guard clause: si no hay libro o no tiene id, renderizamos algo seguro
  if (!book || !book.id) {
    return (
      <View style={[styles.card, { justifyContent: "center" }]}>
        <Text style={{ color: "#555" }}>Libro no disponible</Text>
      </View>
    );
  }

  const [fav, setFav] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const v = await isFavorite(book.id!);
        if (mounted) setFav(v);
      } catch { /* noop */ }
    })();
    return () => { mounted = false; };
  }, [book.id]);

  const onToggleFav = async () => {
    try {
      const nowFav = await toggleFavorite(book);
      setFav(nowFav);
      Alert.alert(nowFav ? "Guardado" : "Quitado", nowFav ? "Agregado a leer después" : "Quitado de leer después");
    } catch (e) {
      Alert.alert("Ups", "No se pudo cambiar el favorito.");
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.card, expanded && styles.cardExpanded]}>
      {book.coverUrl ? (
        <Image source={{ uri: book.coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.placeholder]}>
          <Text>Sin portada</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title || "Sin título"}</Text>
        {book.author ? <Text style={styles.meta}>{book.author}</Text> : null}
        {book.year ? <Text style={styles.meta}>Año: {book.year}</Text> : null}

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

        <View style={styles.actions}>
          <TouchableOpacity onPress={onToggleFav} style={[styles.favBtn, fav && styles.favBtnActive]}>
            <Text style={[styles.favTxt, fav && styles.favTxtActive]}>
              {fav ? "Quitar de leer después" : "Guardar para leer"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 12, borderRadius: 12, backgroundColor: "#fff", marginBottom: 10, width: "100%", elevation: 1, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6 },
  cardExpanded: { paddingBottom: 16 },
  cover: { width: 64, height: 96, borderRadius: 8, backgroundColor: "#eee" },
  placeholder: { alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  meta: { color: "#555", marginTop: 2 },
  extra: { marginTop: 10, gap: 8 },
  desc: { color: "#333", lineHeight: 18 },
  moreBtn: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#0a7" },
  moreTxt: { color: "#0a7", fontWeight: "600" },
  actions: { marginTop: 10 },
  favBtn: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#888" },
  favBtnActive: { borderColor: "#0a7", backgroundColor: "#e6fff6" },
  favTxt: { color: "#333", fontWeight: "600" },
  favTxtActive: { color: "#0a7" },
});
