/* app/(tabs)/index.tsx
 Esta es tu pantalla de inicio. Desde acá podés navegar a otras secciones.*/
 
/* app/(tabs)/index.tsx */
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import BuscarLibros from "../components/BuscarLibros";
import { UIManager, Platform } from "react-native";
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import ListaLibros from "../components/ListaLibros";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenida a ReadMe 📚</Text>
      <BuscarLibros />
      {/* <View style={{ height: 16 }} /> */}
      <ListaLibros />  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", margin: 16, textAlign: "center" },
});
