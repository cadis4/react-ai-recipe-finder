import React from 'react';
import RecipeSearch from '../components/RecipeSearch';
import FavoriteRecipes from '../components/FavoriteRecipes';
import './Home.css';

const Home = ({ favorites, removeFromFavorites, onSearch }) => {
  return (
    <div className="home-page">
      <h1>Search Recipes</h1>
      <RecipeSearch onSearch={onSearch} />
      <FavoriteRecipes favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
};

export default Home;
