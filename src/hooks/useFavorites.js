import { useCallback, useMemo } from 'react';
import { requestConfig } from '../config/requestConfig.js';
import { useLocalStorage } from './useLocalStorage.js';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(requestConfig.storageKeys.favorites, []);

  const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

  const addFavorite = useCallback(
    (item) => {
      setFavorites((current) => (current.some((saved) => saved.id === item.id) ? current : [...current, item]));
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (id) => {
      setFavorites((current) => current.filter((item) => item.id !== id));
    },
    [setFavorites],
  );

  const toggleFavorite = useCallback(
    (item) => {
      setFavorites((current) =>
        current.some((saved) => saved.id === item.id)
          ? current.filter((saved) => saved.id !== item.id)
          : [...current, item],
      );
    },
    [setFavorites],
  );

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);

  return {
    favorites,
    favoriteCount: favorites.length,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
