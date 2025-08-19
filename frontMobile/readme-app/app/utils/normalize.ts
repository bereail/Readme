// app/utils/normalize.ts
import type { Book } from "./favorites";

export function normalizeToBook(raw: any, i: number = 0): Book | null {
  const id =
    String(
      raw?.id ??
      raw?.isbn ??
      `${raw?.title || raw?.titulo || "sin-titulo"}-${raw?.author || raw?.autor || "?"}-${raw?.year || raw?.first_publish_year || ""}-${i}`
    );

  const title = raw?.title ?? raw?.titulo;
  if (!id || !title) return null;

  return {
    id,
    title,
    author: raw?.author ?? raw?.autor ?? undefined,
    year: raw?.year ?? raw?.first_publish_year ?? undefined,
    coverUrl: raw?.coverUrl ?? raw?.imagen_url ?? undefined,
  };
}
