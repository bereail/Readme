// utils/storage.js
export const addToFavorites = (book) => {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(book);
  localStorage.setItem("favorites", JSON.stringify(favs));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const removeFavorite = (id) => {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs = favs.filter((book) => book.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
};
