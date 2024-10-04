import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeInfo.css'

const RecipeInfo = ({ recipe, addToFavorites, removeFromFavorites, favorites }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };
  useEffect(() => {
    if (recipe && Array.isArray(favorites) && favorites.length > 0) {
      const isFav = favorites.some(fav => fav.idMeal === recipe.idMeal);
      setIsFavorited(isFav);
    }
  }, [recipe, favorites]);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    if (isFavorited) {
      removeFromFavorites(recipe);
    } else {
      addToFavorites(recipe);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>Category: {recipe.strCategory}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorited ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default RecipeInfo;
