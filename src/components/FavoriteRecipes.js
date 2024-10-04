import React from 'react';
import RecipeInfo from './RecipeInfo';

const FavoriteRecipes = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorite-recipes">
      <h2 class="avorites-text">Favorites</h2>
      <div className="recipe-list">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeInfo
              key={recipe.id}
              recipe={recipe}
              removeFromFavorites={removeFromFavorites}
              favorites={favorites}
            />
          ))
        ) : (
          <p>No favorite recipes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
