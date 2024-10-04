import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './RecipeDetails.css';

const RecipeDetails = ({ addToFavorites, removeFromFavorites, favorites = [] }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
      setIsLoading(false);
    };

    fetchRecipeDetails();
  }, [id]);

  useEffect(() => {
    if (recipe && Array.isArray(favorites) && favorites.length > 0) {
      const isFav = favorites.some(fav => fav.idMeal === recipe.idMeal);
      setIsFavorited(isFav);
    }
  }, [recipe, favorites]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(recipe);
    } else {
      addToFavorites(recipe);
    }
    setIsFavorited(!isFavorited);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-details">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.strIngredient1 && <li>{recipe.strIngredient1}</li>}
        {recipe.strIngredient2 && <li>{recipe.strIngredient2}</li>}
        {recipe.strIngredient3 && <li>{recipe.strIngredient3}</li>}
      </ul>

      <button onClick={handleFavoriteClick} className={`favorite-button ${isFavorited ? 'favorited' : ''}`}>
        <FaHeart color={isFavorited ? 'red' : 'gray'} />
        {isFavorited ? ' Remove from Favorites' : ' Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipeDetails;
