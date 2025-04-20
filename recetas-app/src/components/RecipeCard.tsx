import React from "react";
import { Recipe } from "../types/Recipe";

interface Props {
  recipe: Recipe;
  onFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, onFavorite, isFavorite }) => {
  return (
    <div
      className="card border-0 shadow-sm h-100 transition-transform transform hover:shadow-lg hover:scale-105" 
      style={{ backgroundColor: "#f5f5dc", color: "#5d4037" }}
    >
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="card-img-top rounded-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text small">{recipe.publisher}</p>
        <button
          className="btn w-100"
          style={{
            backgroundColor: isFavorite ? "#8f9779" : "#d2691e",
            color: "#fff",
            border: "none",
          }}
          onClick={() => onFavorite(recipe)}
        >
          {isFavorite ? "★ Quitar de Favoritos" : "☆ Agregar a Favoritos"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
