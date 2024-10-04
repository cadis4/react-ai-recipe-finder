import React from 'react';
import RecipeInfo from './RecipeInfo';
import './RecipeList.css';

const RecipeList = ({ recipes = [], addToFavorites, removeFromFavorites, favorites }) => {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeInfo
          key={recipe.idMeal}
          recipe={recipe}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default RecipeList;
