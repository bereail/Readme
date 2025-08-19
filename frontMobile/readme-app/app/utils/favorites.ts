// app/utils/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Book = {
  id: string;
  title: string;
  author?: string;
  year?: string | number;
  coverUrl?: string;
};

const KEY = 'favorites_v1';

type FavMap = Record<string, Book>;

async function readMap(): Promise<FavMap> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as FavMap : {};
}

async function writeMap(map: FavMap) {
  await AsyncStorage.setItem(KEY, JSON.stringify(map));
}

export async function getFavorites(): Promise<Book[]> {
  const map = await readMap();
  return Object.values(map);
}

export async function isFavorite(id: string): Promise<boolean> {
  const map = await readMap();
  return !!map[id];
}

export async function toggleFavorite(book: Book): Promise<boolean> {
  const map = await readMap();
  if (map[book.id]) {
    delete map[book.id];
    await writeMap(map);
    return false; // ahora NO es favorito
  } else {
    map[book.id] = { ...book };
    await writeMap(map);
    return true; // ahora SÍ es favorito
  }
}
