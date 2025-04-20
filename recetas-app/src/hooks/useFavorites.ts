import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (recipe: Recipe) =>
    favorites.some((fav) => fav.recipe_id === recipe.recipe_id);

  const addFavorite = (recipe: Recipe) => {
    if (!isFavorite(recipe)) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const removeFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((fav) => fav.recipe_id !== recipe.recipe_id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
      return updatedFavorites;
    });
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
