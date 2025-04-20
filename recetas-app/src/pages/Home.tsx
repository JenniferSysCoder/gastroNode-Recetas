import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { Recipe } from "../types/Recipe";
import RecipeCard from "../components/RecipeCard";
import FilterPanel from "../components/FilterPanel";
import { ToastContainer } from "react-toastify";
import { useNotification } from "../hooks/useNotification";
import { useFavorites } from "../hooks/useFavorites";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { data, loading, error } = useFetchData<{ recipes: Recipe[] }>(
    "https://forkify-api.herokuapp.com/api/search?q=pasta"
  );

  const { notify } = useNotification();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = (recipe: Recipe) => {
    if (!isFavorite(recipe)) {
      addFavorite(recipe);
      notify("Receta agregada a favoritos ⭐");
    } else {
      removeFavorite(recipe);
      notify("Receta removida de favoritos ❌");
    }
  };

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data?.recipes) {
      const categories = Array.from(new Set(data.recipes.map((r) => r.publisher)));
      setAllCategories(categories);
      setFilteredRecipes(data.recipes);
    }
  }, [data]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredRecipes(data?.recipes || []);
    } else {
      const filtered = (data?.recipes || []).filter((recipe) =>
        activeFilters.includes(recipe.publisher)
      );
      setFilteredRecipes(filtered);
    }
  }, [activeFilters, data]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        padding: "2rem",
        backgroundColor: "#fff8e1",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#5d4037", 
      }}
    >
      <div className="mb-4 text-center">
        <h2 className="fw-bold display-5" style={{ color: "#5d4037" }}>
          GastroNode
        </h2>
        <p style={{ color: "#8f9779" }}>Favoritos: {favorites.length}</p>
      </div>

      <div className="mb-4">
        <FilterPanel
          filters={allCategories}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
        />
      </div>

      {loading && <p>Cargando recetas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="row g-4">
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4" key={recipe.recipe_id}>
            <RecipeCard
              recipe={recipe}
              onFavorite={handleFavorite}
              isFavorite={isFavorite(recipe)}
            />
          </div>
        ))}
      </div>

      <ToastContainer />

      <footer
        className="text-center mt-5"
        style={{
          backgroundColor: "#8b5e3c",
          color: "#fff8e1",
          padding: "1rem",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <p>Desarrollado por: Jennifer Tatiana Guerra Figueroa</p>
        <p>Código: GF22I04002</p>
        <p>Derechos reservados - 2025 - Gastronode</p>
        <p>Fecha: 19-04-2025</p>
      </footer>
    </div>
  );
};

export default Home;
